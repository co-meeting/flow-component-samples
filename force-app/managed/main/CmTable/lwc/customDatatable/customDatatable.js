import LightningDatatable from 'lightning/datatable';
import recordLink from './recordLink.html';
import picklist from './picklist.html';
import address from './address.html';

export default class CustomDatatable extends LightningDatatable {
  static customTypes = {
    recordLink: {
      template: recordLink,
      typeAttributes: ['label', 'self']
    },
    picklist: {
      template: picklist,
      typeAttributes: ['options']
    },
    address: {
      template: address
    }
  };
}
