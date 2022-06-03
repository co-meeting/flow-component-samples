import { LightningElement, api } from 'lwc';

export default class CustomDatatablePicklist extends LightningElement {
  @api value;
  @api params;

  get picklistLabel() {
    const targetOption = this.params.options.find((option) => option.value === this.value);
    return targetOption ? targetOption.label : this.value;
  }
}
/*
this.params.optionsの中身は"Picklist Value"の配列である。
https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_picklist_value.htm#ui_api_responses_picklist_value
サンプル）
[
  {
    "attributes": null,
    "label": "熱い",
    "validFor": [],
    "value": "Hot"
  },
  {
    "attributes": null,
    "label": "温かい",
    "validFor": [],
    "value": "Warm"
  },
  {
    "attributes": null,
    "label": "寒い",
    "validFor": [],
    "value": "Cold"
  }
]
*/
