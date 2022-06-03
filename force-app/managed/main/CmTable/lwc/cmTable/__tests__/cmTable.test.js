import { createElement } from 'lwc';
import CmTable from 'c/cmTable';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

const mockGetObjectInfoError = require('./data/getObjectInfo_Error.json');
const mockGetPicklistValuesByRecordTypeByAccountError = require('./data/getPicklistValuesByRecordType_Error.json');

// Account
// type:recordLink(ラベル:Name), phone, number(Int), address, picklist, url, date(DateTime)
const mockGetObjectInfoByAccount = require('./data/Account/getObjectInfo.json');
const mockGetPicklistValuesByRecordTypeByAccount = require('./data/Account/getPicklistValuesByRecordType.json');
const mockApiOriginalRecordsByAccount = require('./data/Account/apiOriginalRecords.json');
const mockExpectedColumnsByAccount = require('./data/Account/expectedColumns.json');

// Case
// type:recordLink(ラベル:ID), picklist, email
const mockGetObjectInfoByCase = require('./data/Case/getObjectInfo.json');
const mockGetPicklistValuesByRecordTypeByCase = require('./data/Case/getPicklistValuesByRecordType.json');
const mockApiOriginalRecordsByCase = require('./data/Case/apiOriginalRecords.json');
const mockExpectedColumnsByCase = require('./data/Case/expectedColumns.json');

// Opportunity
// type:recordLink(ラベル:Name), currency, boolean, date(Date), picklist, text(Percent), text(TextArea)
const mockGetObjectInfoByOpportunity = require('./data/Opportunity/getObjectInfo.json');
const mockGetPicklistValuesByRecordTypeByOpportunity = require('./data/Opportunity/getPicklistValuesByRecordType.json');
const mockApiOriginalRecordsByOpportunity = require('./data/Opportunity/apiOriginalRecords.json');
const mockExpectedColumnsByOpportunity = require('./data/Opportunity/expectedColumns.json');

jest.mock(
  'lightning/flowSupport',
  () => {
    return { FlowAttributeChangeEvent: {} };
  },
  { virtual: true }
);

describe('c-cm-table', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('基本ケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByAccount);
    await getPicklistValuesByRecordType.emit(mockGetPicklistValuesByRecordTypeByAccount);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divEl.outerHTML).toBe('<div style="height: 200px"><c-custom-datatable></c-custom-datatable></div>');
    const dbEl = element.shadowRoot.querySelector('c-custom-datatable');
    const expectedData = JSON.stringify(mockApiOriginalRecordsByAccount);
    const receivedDate = JSON.stringify(dbEl.data);
    const expectedColumns = JSON.stringify(mockExpectedColumnsByAccount);
    const receivedColumns = JSON.stringify(dbEl.columns);
    expect(dbEl.keyField).toBe('id');
    expect(receivedDate).toBe(expectedData);
    expect(receivedColumns).toBe(expectedColumns);
  });

  it('height未指定のケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByAccount;
    element.height = '';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByAccount);
    await getPicklistValuesByRecordType.emit(mockGetPicklistValuesByRecordTypeByAccount);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divEl.outerHTML).toBe('<div><c-custom-datatable></c-custom-datatable></div>');
  });

  it('fieldNamesを指定したケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = 'Name';
    element.originalRecords = mockApiOriginalRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByAccount);
    await getPicklistValuesByRecordType.emit(mockGetPicklistValuesByRecordTypeByAccount);

    // アサーション
    const dbEl = element.shadowRoot.querySelector('c-custom-datatable');
    const expectedData = JSON.stringify(mockApiOriginalRecordsByAccount);
    const receivedDate = JSON.stringify(dbEl.data);
    const expectedColumns = JSON.stringify([
      {
        fieldName: 'Id',
        label: '取引先名',
        type: 'recordLink',
        typeAttributes: {
          label: {
            fieldName: 'Name'
          }
        }
      }
    ]);
    const receivedColumns = JSON.stringify(dbEl.columns);
    expect(dbEl.keyField).toBe('id');
    expect(receivedDate).toBe(expectedData);
    expect(receivedColumns).toBe(expectedColumns);
  });

  it('Nameが存在せずIdのみのケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByCase;
    element.height = '200';
    element.objectName = 'Case';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByCase);
    await getPicklistValuesByRecordType.emit(mockGetPicklistValuesByRecordTypeByCase);

    // アサーション
    const dbEl = element.shadowRoot.querySelector('c-custom-datatable');
    const expectedData = JSON.stringify(mockApiOriginalRecordsByCase);
    const receivedDate = JSON.stringify(dbEl.data);
    const expectedColumns = JSON.stringify(mockExpectedColumnsByCase);
    const receivedColumns = JSON.stringify(dbEl.columns);
    expect(dbEl.keyField).toBe('id');
    expect(receivedDate).toBe(expectedData);
    expect(receivedColumns).toBe(expectedColumns);
  });

  it('その他Type対応のためOpportunityのケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByOpportunity;
    element.height = '';
    element.objectName = 'Opportunity';
    document.body.appendChild(element);

    // Emit data from @wire
    await getObjectInfo.emit(mockGetObjectInfoByOpportunity);
    await getPicklistValuesByRecordType.emit(mockGetPicklistValuesByRecordTypeByOpportunity);

    // アサーション
    const dbEl = element.shadowRoot.querySelector('c-custom-datatable');
    const expectedData = JSON.stringify(mockApiOriginalRecordsByOpportunity);
    const receivedDate = JSON.stringify(dbEl.data);
    const expectedColumns = JSON.stringify(mockExpectedColumnsByOpportunity);
    const receivedColumns = JSON.stringify(dbEl.columns);
    expect(dbEl.keyField).toBe('id');
    expect(receivedDate).toBe(expectedData);
    expect(receivedColumns).toBe(expectedColumns);
  });

  it('ローディング中の表示確認', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divEl.innerHTML).toBe('<lightning-spinner></lightning-spinner>');
  });

  it('getObjectInfoでエラー発生ケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    // error data from @wire
    await getObjectInfo.error(mockGetObjectInfoError);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div.slds-theme_error');
    expect(divEl.className).toBe('slds-scoped-notification slds-media slds-media_center slds-theme_error');
    expect(divEl.childElementCount).toBe(2);
    expect(divEl.children[1].className).toBe('slds-media__body');
    const divBody = divEl.children[1];
    expect(divBody.childElementCount).toBe(2);
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divBody.children[0].outerHTML).toBe('<p>【CmTable Component Error】</p>');
    expect(divBody.children[1].className).toBe('slds-p-left_medium slds-list_dotted');
    const errUiList = divBody.children[1];
    expect(errUiList.childElementCount).toBe(3);
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errUiList.children[0].outerHTML).toBe('<li>An error occurred when retrieving the data.</li>');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errUiList.children[1].outerHTML).toBe(
      '<li>403:INSUFFICIENT_ACCESS:このレコードへのアクセス権がありません。システム管理者にサポートを依頼するか、アクセス権を要求してください。</li>'
    );
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errUiList.children[2].outerHTML).toBe(
      '<li>error method: getObjectInfo<span> (objectApiName=Account) </span></li>'
    );
  });

  it('getPicklistValuesByRecordTypeでエラー発生ケース', async () => {
    const element = createElement('c-cm-table', {
      is: CmTable
    });
    element.fieldNames = '';
    element.originalRecords = mockApiOriginalRecordsByAccount;
    element.height = '200';
    element.objectName = 'Account';
    document.body.appendChild(element);

    await getObjectInfo.emit(mockGetObjectInfoByAccount);
    await getPicklistValuesByRecordType.error(mockGetPicklistValuesByRecordTypeByAccountError);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div.slds-theme_error');
    expect(divEl.className).toBe('slds-scoped-notification slds-media slds-media_center slds-theme_error');
    expect(divEl.childElementCount).toBe(2);
    expect(divEl.children[1].className).toBe('slds-media__body');
    const divBody = divEl.children[1];
    expect(divBody.childElementCount).toBe(2);
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divBody.children[0].outerHTML).toBe('<p>【CmTable Component Error】</p>');
    expect(divBody.children[1].className).toBe('slds-p-left_medium slds-list_dotted');
    const errUiList = divBody.children[1];
    expect(errUiList.childElementCount).toBe(3);
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errUiList.children[0].outerHTML).toBe('<li>An error occurred when retrieving the data.</li>');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errUiList.children[1].outerHTML).toBe(
      "<li>400:INVALID_ID_FIELD:Illegal value for parameter: 'recordTypeId': masterRecordTypeId</li>"
    );
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errUiList.children[2].outerHTML).toBe(
      '<li>error method: getPicklistValuesByRecordType<span> (objectApiName=Account,recordTypeId=012000000000000AAA) </span></li>'
    );
  });
});
