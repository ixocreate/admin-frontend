import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import * as moment from 'moment';
import { LocaleSettings } from 'primeng/components/calendar/calendar';
import { Calendar } from 'primeng/primeng';

@Component({
  selector: 'formly-field-datetime',
  template: `
    <p-calendar [placeholder]="this.to.placeholder"
                [(ngModel)]="dateValue"
                [dateFormat]="config.dateFormat"
                [locale]="locale"
                [showTime]="config.showTime"
                [class.is-invalid]="showError">
    </p-calendar>
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
