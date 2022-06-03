import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomDatatableRecordLink extends NavigationMixin(LightningElement) {
  @api recordid;
  @api params;
  @track recordUrl;

  connectedCallback() {
    this[NavigationMixin.GenerateUrl]({
      type: 'standard__recordPage',
      attributes: {
        recordId: this.recordid,
        actionName: 'view'
      }
    }).then((url) => {
      this.recordUrl = url;
    });
  }

  handleClick(e) {
    if (!this.params.self) return;
    e.preventDefault();
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: this.recordid,
        actionName: 'view'
      }
    });
  }

  get target() {
    return this.params.self ? '_self' : '_blank';
  }
}
