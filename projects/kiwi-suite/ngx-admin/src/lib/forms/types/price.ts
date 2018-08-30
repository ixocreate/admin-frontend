import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-price',
  template: `
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <div class="input-group-text" [class.is-invalid]="showError || !isValid">
          <div class="input-group-select-wrapper">
            <select class="input-group-select" [(ngModel)]="selectedOption" (change)="setPrice()">
              <option *ngFor="let option of selectOptions" [ngValue]="option">{{ option.label }}</option>
            </select>
          </div>
        </div>
      </div>
      <input type="text" class="form-control" [(ngModel)]="currentPrice" (change)="updateInput()" (keyup)="setPrice()"
             [placeholder]="to.placeholder" [class.is-invalid]="showError || !isValid">
    </div>
  `,
})
export class FormlyFieldPriceComponent extends CustomFieldTypeAbstract implements OnInit {

  isValid = true;

  currentPrice;

  selectedOption;
  selectOptions = [
    {label: 'EUR', value: 'EUR'},
    {label: 'USD', value: 'USD'},
  ];

  private decimalPlaces = 2;

  ngOnInit() {
    super.ngOnInit();
    this.selectedOption = this.selectOptions[0];
  }

  setPrice() {
    console.log(this.selectedOption);
    this.isValid = true;
    let price: number = parseFloat(this.currentPrice);
    if (isNaN(price)) {
      this.isValid = false;
      this.setValue(null);
    } else {
      price = parseFloat(price.toFixed(this.decimalPlaces));
      this.setValue({
        currency: this.selectedOption.value,
        price: price,
      });
    }
  }

  updateInput() {
    const price: number = parseFloat(this.currentPrice);
    if (isNaN(price)) {
      this.currentPrice = '';
    } else {
      this.currentPrice = price.toFixed(this.decimalPlaces);
    }
  }
}
