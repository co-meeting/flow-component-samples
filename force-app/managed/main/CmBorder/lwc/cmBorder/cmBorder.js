import { LightningElement, api } from 'lwc';

const ALLOW_LIST_BORDER_STYLE = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
const DEFAULT_BORDER_WIDTH = '1px';
const DEFAULT_BORDER_STYLE = 'solid';
const DEFAULT_COLOR = '#c9c9c9';
const DEFAULT_WIDTH = '100%';

export default class CmBorder extends LightningElement {
  @api borderWidth;
  @api borderStyle;
  @api borderColor;
  @api width;
  @api additionalStyle;

  get divStyleCss() {
    const borderTop = this.getBorderTop;
    const width = 'width:' + (this.width ? this.width : DEFAULT_WIDTH);
    const additionalStyle = this.additionalStyle || '';
    return `${borderTop};${width};${additionalStyle}`;
  }

  get getBorderTop() {
    const _borderWidth = this.borderWidth ? this.borderWidth + 'px' : DEFAULT_BORDER_WIDTH;
    const _borderStyle = ALLOW_LIST_BORDER_STYLE.includes(this.borderStyle) ? this.borderStyle : DEFAULT_BORDER_STYLE;
    let _borderColor = DEFAULT_COLOR;
    if (this.borderColor) {
      const tempStyle = new Option().style;
      tempStyle.color = this.borderColor;
      _borderColor = tempStyle.color || DEFAULT_COLOR;
    }
    return `border-top: ${_borderWidth} ${_borderStyle} ${_borderColor}`;
  }
}
