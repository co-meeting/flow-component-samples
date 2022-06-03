import { createElement } from 'lwc';
import CmBorder from 'c/cmBorder';

describe('c-cm-border', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('引数未指定のケース', () => {
    const element = createElement('c-cm-border', {
      is: CmBorder
    });
    document.body.appendChild(element);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divEl.outerHTML).toBe('<div style="border-top: 1px solid #c9c9c9;width:100%;"></div>');
  });

  it('引数を全て指定したケース', () => {
    const element = createElement('c-cm-border', {
      is: CmBorder
    });
    element.borderColor = '#990000';
    element.borderStyle = 'dotted';
    element.borderWidth = 3;
    element.width = '100px';
    element.additionalStyle = 'margin-top: -9px;';
    document.body.appendChild(element);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divEl.outerHTML).toBe(
      '<div style="border-top: 3px dotted rgb(153, 0, 0);width:100px;margin-top: -9px;"></div>'
    );
  });

  it('borderStyleやborderColorに不正な値を指定ケース', () => {
    const element = createElement('c-cm-border', {
      is: CmBorder
    });
    element.borderColor = 'aaaaaa';
    element.borderStyle = 'bbbbbb';
    element.borderWidth = 4;
    document.body.appendChild(element);

    // アサーション
    const divEl = element.shadowRoot.querySelector('div');
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(divEl.outerHTML).toBe('<div style="border-top: 4px solid #c9c9c9;width:100%;"></div>');
  });
});
