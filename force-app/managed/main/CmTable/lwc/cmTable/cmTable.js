import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CustomDatatableMixin } from 'c/customDatatableMixin';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

const typeMappings = {
  Picklist: 'picklist', // LightningDatatableにカスタムタイプとして拡張(関連: CustomDatatablePicklist)
  Currency: 'currency', // TODO: Displaying Currency and Percentagesに記載されているような細かい制御はカスタムプロパティエディタを利用すると対応できるかもしれないが、今回はこのまま。
  Address: 'address', // LightningDatatableにカスタムタイプとして拡張(関連: CustomDatatableAddress)
  Double: 'number', // TODO: デフォルトのまま。細かい制御ができるようにするのは今後の優先度次第。カスタムプロパティエディタを利用すると対応できるかもしれないが、今回はこのまま。
  TextArea: 'text',
  Reference: 'text', // TODO:指定された情報に合わせて柔軟に対応するのは、カスタムプロパティエディタを利用すると対応できるかもしれないが、今回はこのまま。
  DateTime: 'date',
  Phone: 'phone',
  Boolean: 'boolean',
  Date: 'date', // Displaying Date and Time Using Type Attributes.
  Email: 'email',
  Int: 'number',
  Url: 'url',
  Percent: 'text', // TODO:いつか対応したい（textにしている理由：例えば商談の確度(%)などPercentであるが、画面表示上の”10%”は10とデータが格納され、"percent"を利用しようとすると1000%になってしまうため）
  String: 'text'
};
const PAGE_SIZE = 100;

export default class CmTable extends CustomDatatableMixin(NavigationMixin(LightningElement)) {
  @api fieldNames;
  @api originalRecords;
  @api height;
  @api isCheckbox;
  @api objectName;
  @api selectedRecords;
  columns;
  wiredObjectInfo;
  wiredPicklistValues;
  @track errorInfo;

  // データの有無
  get hasData() {
    return this.objectName && !this.errorInfo && !this.isLoading;
  }

  // サーバー問い合わせ中であるか返却
  get isLoading() {
    if (!this.objectName) return false; // getに必要な基本情報が存在しない
    if (this.errorInfo) return false; //  エラー発生中ではない
    return !(
      this.wiredObjectInfo &&
      this.wiredObjectInfo.data &&
      this.wiredPicklistValues &&
      this.wiredPicklistValues.data
    ); // 画面描画に必要なデータが揃ってない（＝Loading中）
  }

  // 表の高さCSSスタイルを返却
  get style() {
    if (!this.height || this.height === 0) return ''; // 最低限表示する
    return 'height: ' + this.height + 'px';
  }

  // 表形式の列名となる項目一覧を取得
  get displayFieldNames() {
    if (this.fieldNames && this.fieldNames.length > 0) {
      // 描画する項目が指定されていたら利用する
      return this.fieldNames.split(',');
    } else if (this.originalRecords && this.originalRecords.length > 0) {
      // 描画する項目が指定されていなければ、
      // 引き渡されたレコードに存在する項目を利用する
      return Object.keys(this.originalRecords[0]);
    }
    return [];
  }

  // 項目情報を返却
  get fieldInfos() {
    return this.wiredObjectInfo?.data?.fields;
  }

  get masterRecordTypeId() {
    if (this.wiredObjectInfo?.data?.recordTypeInfos) {
      const rtis = this.wiredObjectInfo.data.recordTypeInfos;
      return Object.keys(rtis).find((recordTypeId) => rtis[recordTypeId].master);
    }
    return undefined;
  }

  get picklistFieldValues() {
    if (
      this.wiredPicklistValues &&
      this.wiredPicklistValues.data &&
      this.wiredPicklistValues.data.picklistFieldValues
    ) {
      return this.wiredPicklistValues.data.picklistFieldValues;
    }
    return undefined;
  }

  // wireサービスを利用して指定オブジェクトの定義情報を取得する
  @wire(getObjectInfo, { objectApiName: '$objectName' })
  wiredObjectInfoCallback(value) {
    this.wiredObjectInfo = value;
    const { data, error } = value;
    if (data) {
      this.errorInfo = null;
    } else if (error) {
      console.error(error);
      this.errorInfo = {
        title: 'An error occurred when retrieving the data.',
        method: 'getObjectInfo',
        arguments: 'objectApiName=' + this.objectName,
        message: error.body.statusCode + ':' + error.body.errorCode + ':' + error.body.message
      };
    }
  }

  // wireサービスを利用して指定オブジェクトの選択リスト情報を取得する
  @wire(getPicklistValuesByRecordType, {
    objectApiName: '$objectName',
    recordTypeId: '$masterRecordTypeId'
  })
  wiredPicklistValuesCallback(value) {
    this.wiredPicklistValues = value;
    const { data, error } = value;
    if (data) {
      this.errorInfo = null;
      this._initializationColumns();
      this._initializationData();
    } else if (error) {
      console.error(error);
      this.errorInfo = {
        title: 'An error occurred when retrieving the data.',
        method: 'getPicklistValuesByRecordType',
        arguments: 'objectApiName=' + this.objectName + ',recordTypeId=' + this.masterRecordTypeId,
        message: error.body.statusCode + ':' + error.body.errorCode + ':' + error.body.message
      };
    }
  }

  // 表形式の列情報を初期化
  _initializationColumns() {
    this.columns = this.displayFieldNames
      .filter((apiName) => !['Id', 'Name'].includes(apiName))
      .map((apiName) => this._generateColumn(apiName));

    if (this.displayFieldNames.includes('Name')) {
      // Idをキーにした使ったリンク付きNameとする
      this.columns.unshift({
        fieldName: 'Id',
        label: this.fieldInfos.Name.label,
        type: 'recordLink',
        typeAttributes: { label: { fieldName: 'Name' } }
      });
    } else {
      // Nameが存在しない場合はリンク付きIdとする
      this.columns.unshift({
        fieldName: 'Id',
        label: this.fieldInfos.Id.label,
        type: 'recordLink',
        typeAttributes: { label: { fieldName: 'Id' } }
      });
    }
  }

  _generateColumn(apiName) {
    const fieldDataType = this.fieldInfos[apiName].dataType;
    const columnType = typeMappings[fieldDataType] ? typeMappings[fieldDataType] : 'text';
    const column = {
      fieldName: apiName,
      label: this.fieldInfos[apiName].label,
      type: columnType,
      typeAttributes: this._generateColumnTypeAttributes(fieldDataType, apiName)
    };
    return column;
  }

  _generateColumnTypeAttributes(fieldDataType, apiName) {
    if (fieldDataType === 'DateTime') {
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      };
    } else if (fieldDataType === 'Date') {
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };
    } else if (fieldDataType === 'Picklist') {
      return {
        options: this.picklistFieldValues[apiName].values
      };
    }
    return undefined;
  }

  _initializationData() {
    this.initRecords(this.originalRecords, PAGE_SIZE);
  }

  // 選択された行の情報をselectedRecordsにセット
  handleSelectedRow(event) {
    const selectedRows = event.detail.selectedRows;
    this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecords', selectedRows));
    console.table(selectedRows);
    console.log(JSON.stringify(event));
  }
}
