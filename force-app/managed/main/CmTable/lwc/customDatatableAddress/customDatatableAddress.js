import { LightningElement, api } from 'lwc';

export default class CustomDatatableAddress extends LightningElement {
  @api value;

  get displayAddress() {
    return this.country + ' ' + this.postalCode + ' ' + this.state + ' ' + this.city + ' ' + this.street;
  }
  get country() {
    return this.value && this.value.country ? this.value.country : '';
  }
  get postalCode() {
    return this.value && this.value.postalCode ? this.value.postalCode : '';
  }
  get state() {
    return this.value && this.value.state ? this.value.state : '';
  }
  get city() {
    return this.value && this.value.city ? this.value.city : '';
  }
  get street() {
    return this.value && this.value.street ? this.value.street : '';
  }
}
