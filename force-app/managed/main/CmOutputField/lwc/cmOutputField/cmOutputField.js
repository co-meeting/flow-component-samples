import { LightningElement, api } from 'lwc';

export default class CmOutputField extends LightningElement {
  @api record;
  @api objectName;
  @api fieldName;

  get hasData() {
    return this.record && this.objectName && this.fieldName;
  }
}
