import { Component, forwardRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Calendar } from 'primeng/primeng';
import { LocaleSettings } from 'primeng/components/calendar/calendar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KiwiDatePickerComponent),
  multi: true
};

@Component({
  selector: 'kiwi-date-picker',
  templateUrl: './kiwi-date-picker.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class KiwiDatePickerComponent implements ControlValueAccessor, OnInit {

  @ViewChild(Calendar) calendar;

  @Input() placeholder: string = null;
  @Input() dateFormat = 'yy-mm-dd';
  @Input() showTime = true;
  @Input() useUtcTime = false;
  @Input() showError = false;

  @HostBinding('class.date-picker') datePickerClass = true;

  _date: Date;
  locale: LocaleSettings;

  private innerValue: any = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit() {
    this.locale = {
      ...this.calendar.locale,
      firstDayOfWeek: 1,
    };
    if (this.value) {
      this._date = moment(this.value).toDate();
    }
  }

  set dateValue(value: Date) {
    this.value = moment(value).utc(this.useUtcTime).seconds(0).toISOString();
    this._date = value;
  }

  get dateValue() {
    return this._date;
  }

}
