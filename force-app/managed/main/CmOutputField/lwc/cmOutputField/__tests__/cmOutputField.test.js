import { createElement } from 'lwc';
import CmOutputField from 'c/cmOutputField';

describe('c-cm-output-field', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('引数指定なし', () => {
    const element = createElement('c-cm-output-field', {
      is: CmOutputField
    });
    document.body.appendChild(element);

    // 引数が存在しない場合は、情報が出力されない。
    const formEl = element.shadowRoot.querySelector('lightning-record-view-form');
    expect(formEl).toBe(null);
  });

  it('引数1つだけ指定なし（record,fieldNameのみ）', () => {
    const RECORD = { Id: 'a00xx000000bqqDAAQ' };
    const FIELD_NAME = 'Name';

    const element = createElement('c-cm-output-field', {
      is: CmOutputField
    });
    element.record = RECORD;
    element.fieldName = FIELD_NAME;
    document.body.appendChild(element);

    // 引数が一つでも存在しない場合は、情報が出力されない。
    const formEl = element.shadowRoot.querySelector('lightning-record-view-form');
    expect(formEl).toBe(null);
  });

  it('引数1つだけ指定なし(objectName,fieldName)', () => {
    const OBJECT_NAME = 'Account';
    const FIELD_NAME = 'Name';

    const element = createElement('c-cm-output-field', {
      is: CmOutputField
    });
    element.objectName = OBJECT_NAME;
    element.fieldName = FIELD_NAME;
    document.body.appendChild(element);

    // 引数が一つでも存在しない場合は、情報が出力されない。
    const formEl = element.shadowRoot.querySelector('lightning-record-view-form');
    expect(formEl).toBe(null);
  });
  it('引数1つだけ指定なし(record,objectName)', () => {
    const RECORD = { Id: 'a00xx000000bqqDAAQ' };
    const OBJECT_NAME = 'Account';

    const element = createElement('c-cm-output-field', {
      is: CmOutputField
    });
    element.record = RECORD;
    element.objectName = OBJECT_NAME;
    document.body.appendChild(element);

    // 引数が一つでも存在しない場合は、情報が出力されない。
    const formEl = element.shadowRoot.querySelector('lightning-record-view-form');
    expect(formEl).toBe(null);
  });

  it('引数指定', () => {
    const RECORD = { Id: 'a00xx000000bqqDAAQ' };
    const OBJECT_NAME = 'Account';
    const FIELD_NAME = 'Name';

    const element = createElement('c-cm-output-field', {
      is: CmOutputField
    });
    element.record = RECORD;
    element.objectName = OBJECT_NAME;
    element.fieldName = FIELD_NAME;
    document.body.appendChild(element);

    // 展開された情報が指定引数をもとに展開されているか確認する
    const formEl = element.shadowRoot.querySelector('lightning-record-view-form');
    expect(formEl.recordId).toBe(RECORD.Id);
    expect(formEl.objectApiName).toBe(OBJECT_NAME);

    const fieldEls = element.shadowRoot.querySelectorAll('lightning-output-field');
    expect(fieldEls.length).toBe(1);
    expect(fieldEls[0].fieldName).toBe(FIELD_NAME);
  });
});
