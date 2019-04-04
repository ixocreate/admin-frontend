import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment-timezone';
import { Calendar, LocaleSettings } from 'primeng/components/calendar/calendar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultHelper } from '../../helpers/default.helper';
import { NotificationService } from '../../services/notification.service';
import { ConfigService } from '../../services/config.service';
import { IxoDatePipe } from '../../pipes/ixo-date.pipe';
import { IxoDateTimePipe } from '../../pipes/ixo-date-time.pipe';
import { IxoTimePipe } from '../../pipes/ixo-time.pipe';

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
  formattedDate = '';

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
              private ixoDateTime: IxoDateTimePipe,
              private ixoTime: IxoTimePipe) {
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

    /**
     * TODO: read locale settings from angular i18n data
     * https://www.primefaces.org/primeng/#/calendar
     */
    // this.en = {
    //   firstDayOfWeek: 0,
    //   dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //   dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    //   dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
    //   monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
    //   monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    //   today: 'Today',
    //   clear: 'Clear',
    //   dateFormat: 'mm/dd/yy'
    // };
    this.locale = {
      firstDayOfWeek: 1,
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: this.config.dateFormat,
    };

    setTimeout(() => {
      if (this.value) {
        // this._date = moment(this.value).toDate();
        // this.formattedDate = moment(this.dateValue).format(this.inputFormat);
        if (this.showTime) {
          /**
           * date from db comes in utc
           */
          const utcDate = moment(this.value).utc();
          // console.warn('utcDate', utcDate.utc().format());

          /**
           * the date in the user's desired timezone
           */
          let userDate = utcDate.tz(this.config.timezone);
          if (!this.showTime) {
            /**
             * interpret as utc for dates without time
             */
            userDate = moment(utcDate.format('YYYY-MM-DD'));
          }
          // console.log('userDate', userDate.format());
          // console.log('userDate offset', userDate.utcOffset());

          /**
           * for the datepicker remove timezone information so user sees the expected value
           * as the datepicker itself always displays browser timezone
           */
          this._date = moment(moment(userDate).format('YYYY-MM-DD HH:mm:00')).toDate();

          /**
           * display is much easier - just display date in the user's desired timezone
           */
          this.formattedDate = moment(this.value).tz(this.config.timezone).format(this.inputFormat);

        } else {
          /**
           * take any date without time as is without taking timezone into account
           */
          this._date = moment(this.value).toDate();

          this.formattedDate = moment(this.value).format(this.inputFormat);
        }
      }
    });
  }

  onChange(event: any) {
    const date = moment(event.target.value, this.inputFormat);
    if (date.isValid()) {
      this.dateValue = date.toDate();
    } else {
      this.notification.error('Invalid Date');
      this.dateValue = null;
    }
  }

  get inputFormat() {
    if (this.showTime) {
      return this.config.dateFormat + ' ' + this.config.timeFormat;
    }
    return this.config.dateFormat;
  }

  set dateValue(value: Date) {
    // this.value = moment(value).utc(this.useUtcTime).seconds(0).toISOString();
    // this._date = value;
    // const dateForFormat = moment(this.dateValue);
    // this.formattedDate = dateForFormat.isValid() ? dateForFormat.format(this.inputFormat) : '';
    let utcDate = null;

    /**
     * the shifted date in the datepicker
     */
    this._date = value;
    // console.warn(this._date);

    // const browserOffset = moment().format('Z');
    // console.log('browserOffset', browserOffset);

    if (this.showTime) {
      /**
       * reverse the timezone truncation
       * calendar always displays browser's timezone
       * disregard that and assume that the time entered is the configured timezone
       */
      const userOffset = moment(value).tz(this.config.timezone).format('Z');
      // console.log('userOffset', userOffset);

      const userDate = moment(moment(value).format('YYYY-MM-DD HH:mm:00') + userOffset);
      // console.log('userDate', moment(value).format('YYYY-MM-DD HH:mm:00')+userOffset);

      /**
       * the utcDate to be used as value internalle
       */
      utcDate = moment(userDate).utc().toISOString();
    } else {
      /**
       * interpret as utc for dates without time
       */
      utcDate = moment.utc(moment(value).format('YYYY-MM-DD')).toISOString();
    }
    this.value = utcDate;
    // console.log('utcDate', utcDate);

    this.formattedDate = moment.utc(utcDate).tz(this.config.timezone).format(this.inputFormat);
  }

  get dateValue() {
    return this._date;
  }
}
