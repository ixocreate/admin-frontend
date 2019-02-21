import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-price',
  template: `
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text" [class.is-invalid]="showError || !isValid">
          <div class="input-group-select-wrapper">
            <select class="input-group-select" [(ngModel)]="selectedOption" (change)="setPrice()" [disabled]="to.disabled">
              <option *ngFor="let option of selectOptions" [ngValue]="option">{{ option.label }}</option>
            </select>
          </div>
        </div>
      </div>
      <input type="text" class="form-control" [(ngModel)]="currentPrice" (change)="updateInput()" (keyup)="setPrice()"
             [placeholder]="to.placeholder" [class.is-invalid]="showError || !isValid" [disabled]="to.disabled">
    </div>
  `,
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
    this.selectedOption = this.selectOptions[0];
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
        currency: this.selectedOption.value,
        price,
      });
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
