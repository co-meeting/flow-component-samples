import { LightningElement, track, api } from 'lwc';

export default class CmOutputFieldEditor extends LightningElement {
  _inputVariables = [];
  _genericTypeMappings;

  @api builderContext = {};
  @api automaticOutputVariables;

  @track
  inputValues = {
    objectName: {
      value: null,
      valueDataType: 'string',
      isCollection: false,
      label: 'S オブジェクト種別' // NOTE: このラベル気持ち悪いが、画面フロー上でオブジェクト指定にエラーが発生した際のラベルが「S オブジェクト種別」であり、このラベルを柔軟に変更できないため、表現を統一させるためこの名前とした。
    },
    record: {
      value: null,
      valueDataType: 'reference',
      isCollection: false,
      label: 'レコード'
    },
    fieldName: {
      value: null,
      valueDataType: 'string',
      isCollection: false,
      label: '項目名'
    }
  };

  @api
  get inputVariables() {
    return this._inputVariables;
  }
  set inputVariables(variables) {
    this._inputVariables = variables || [];
    this._initializeValues();
  }

  @api get genericTypeMappings() {
    return this._genericTypeMappings;
  }
  set genericTypeMappings(mappings) {
    this._genericTypeMappings = mappings;
    this._initializeObjectName();
  }

  _initializeValues() {
    this._inputVariables.forEach((variable) => {
      this.inputValues[variable.name] = {
        ...this.inputValues[variable.name],
        value: variable.value,
        valueDataType: variable.valueDataType,
        isCollection: variable.isCollection
      };
    });
  }

  _initializeObjectName() {
    const type = this.genericTypeMappings.find(({ typeName }) => typeName === 'T');
    this.inputValues.objectName.value = type && type.typeValue;
  }

  handleChangeRecord(event) {
    if (event.target && event.detail) {
      const lookupReferenceName = event.detail.newValue;
      // レコードのobjectNameを取得
      const lookupRecordObjectName = this._getRecordLookupsObjectName(lookupReferenceName);

      if (lookupRecordObjectName != null) {
        // propertyType name="T"に対する設定
        this._dispatchFlowTypeMappingChangeEvent('T', lookupRecordObjectName);
        // property name="objectName"に対する設定
        this._dispatchFlowValueChangeEvent('objectName', lookupRecordObjectName, 'string');
        // property name="record"に対する設定
        this._dispatchFlowValueChangeEvent('record', lookupReferenceName, 'reference');
      } else {
        this._dispatchFlowValueChangeEvent('objectName', '', 'string');
        this._dispatchFlowValueChangeEvent('record', '', 'reference');
        this._dispatchFlowValueChangeEvent('fieldName', '', 'string');
      }
    }
  }

  _getRecordLookupsObjectName(lookupRecordName) {
    if (!this.builderContext.recordLookups) {
      return null;
    }

    const lookupRecord = this.builderContext.recordLookups.find(({ name }) => name === lookupRecordName);
    if (lookupRecord) {
      return lookupRecord.object;
    }
    return null;
  }

  handleChangeFieldName(event) {
    if (event.detail) {
      this.inputValues.fieldName.value = event.detail.value;
      this._dispatchFlowValueChangeEvent('fieldName', event.detail.value, 'string');
    } else {
      this.inputValues.fieldName.value = '';
      this._dispatchFlowValueChangeEvent('fieldName', '', 'string');
    }
  }

  _dispatchFlowValueChangeEvent(id, newValue, newValueDataType) {
    const valueChangedEvent = new CustomEvent('configuration_editor_input_value_changed', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        name: id,
        newValue: newValue ? newValue : null,
        newValueDataType: newValueDataType
      }
    });
    this.dispatchEvent(valueChangedEvent);
  }

  _dispatchFlowTypeMappingChangeEvent(typeName, typeValue) {
    const typeChangedEvent = new CustomEvent('configuration_editor_generic_type_mapping_changed', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        typeName,
        typeValue
      }
    });
    this.dispatchEvent(typeChangedEvent);
  }
}
