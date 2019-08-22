import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

@Component({
  selector: 'formly-field-price',
  templateUrl: './formly-field-price.component.html'
})
export class FormlyFieldPriceComponent extends CustomFieldTypeAbstract implements OnInit {

  isValid = true;

  currentPrice;

  selectedOption;
  selectOptions = [];

  private decimal = 2;

  ngOnInit() {
    super.ngOnInit();
    this.decimal = this.to.decimal;
    for (const currency of this.to.currencies) {
      this.selectOptions.push({label: currency, value: currency});
    }
    if (this.value) {
      this.selectedOption = this.value.currency;
    } else {
      this.selectedOption = this.selectOptions[0].value;
    }
  }

  setPrice() {
    this.isValid = true;
    let price: number = parseFloat(this.currentPrice);
    if (isNaN(price)) {
      this.isValid = false;
      this.setValue(null);
    } else {
      price = parseFloat(price.toFixed(this.decimal));
      this.setValue({
        currency: this.selectedOption,
        price,
      });
    }
  }

  setValue(value: any) {
    super.setValue(value);
    if (value) {
      this.selectedOption = value.currency;
      this.currentPrice = value.price;
    }
  }

  updateInput() {
    const price: number = parseFloat(this.currentPrice);
    if (isNaN(price)) {
      this.currentPrice = '';
    } else {
      this.currentPrice = price.toFixed(this.decimal);
    }
  }
}
