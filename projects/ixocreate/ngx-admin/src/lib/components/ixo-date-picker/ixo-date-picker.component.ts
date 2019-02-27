import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Calendar } from 'primeng/primeng';
import { LocaleSettings } from 'primeng/components/calendar/calendar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultHelper } from '../../helpers/default.helper';
import { NotificationService } from '../../services/notification.service';
import { ConfigService } from '../../services/config.service';
import { IxoDatePipe } from '../../pipes/ixo-date.pipe';
import { IxoDateTimePipe } from '../../pipes/ixo-date-time.pipe';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IxoDatePickerComponent),
  multi: true,
};

@Component({
  selector: 'ixo-date-picker',
  templateUrl: './ixo-date-picker.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class IxoDatePickerComponent implements ControlValueAccessor, OnInit {

  @ViewChild(Calendar) calendar;

  @Input() placeholder: string = null;
  @Input() showTime = true;
  @Input() useUtcTime = false;
  @Input() showError = false;

  @HostBinding('class.date-picker') datePickerClass = true;

  _date: Date;
  locale: LocaleSettings;
  showOverlay = false;
  formatedDate = '';

  private innerValue: any = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @HostListener('document:click.out-zone', ['$event']) clickEvent(event) {
    const clickInside = DefaultHelper.isDescendant(this.element.nativeElement, event.target);
    if (clickInside && !this.showOverlay) {
      this.zone.run(() => {
        this.showOverlay = true;
      });
    } else if (!clickInside && this.showOverlay) {
      this.zone.run(() => {
        this.showOverlay = false;
      });
    }
  }

  constructor(private element: ElementRef,
              private zone: NgZone,
              private notification: NotificationService,
              private config: ConfigService,
              private ixoDate: IxoDatePipe,
              private ixoDateTime: IxoDateTimePipe) {
  }

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
    setTimeout(() => {
      if (this.value) {
        this._date = moment(this.value).toDate();
        this.formatedDate = moment(this.dateValue).format(this.formatDateString);
      }
    });
  }

  onChange(event: any) {
    const date = moment(event.target.value, this.formatDateString);
    if (date.isValid()) {
      this.dateValue = date.toDate();
    } else {
      this.notification.error('Invalid Date');
      this.dateValue = null;
    }
  }

  get formatDateString() {
    if (this.showTime) {
      return this.ixoDateTime.formatString;
    }
    return this.ixoDate.formatString;
  }

  set dateValue(value: Date) {
    this.value = moment(value).utc(this.useUtcTime).seconds(0).toISOString();
    this._date = value;
    const dateForFormat = moment(this.dateValue);
    this.formatedDate = dateForFormat.isValid() ? dateForFormat.format(this.formatDateString) : '';
  }

  get dateValue() {
    return this._date;
  }

}
