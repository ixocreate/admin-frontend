import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import * as moment from 'moment';
import { LocaleSettings } from 'primeng/components/calendar/calendar';
import { Calendar } from 'primeng/primeng';

@Component({
  selector: 'formly-field-datetime',
  template: `
    <div class="input-group">
      <p-calendar class="date-picker"
                  [placeholder]="to.placeholder"
                  [(ngModel)]="dateValue"
                  [dateFormat]="config.dateFormat"
                  [locale]="locale"
                  [showTime]="config.showTime"
                  [disabled]="to.disabled"
                  [class.is-invalid]="showError">
      </p-calendar>
      <div class="input-group-append" *ngIf="!to.required && !to.disabled">
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()">
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
  `,
})
export class FormlyFieldDateTimeComponent extends CustomFieldTypeAbstract implements OnInit {

  @ViewChild(Calendar) calendar;

  _date: Date;
  locale: LocaleSettings;

  config = {
    dateFormat: 'yy-mm-dd',
    showTime: true,
    useUtcTime: false,
  };

  ngOnInit() {
    super.ngOnInit();
    this.locale = {
      ...this.calendar.locale,
      firstDayOfWeek: 1,
    };
    if (this.value) {
      this._date = moment(this.value).toDate();
    }
    this.config = {
      ...this.config,
      ...this.to.config,
    };
  }

  set dateValue(value: Date) {
    this.setValue(moment(value).utc(this.config.useUtcTime).seconds(0).toISOString());
    this._date = value;
  }

  get dateValue() {
    return this._date;
  }
}
