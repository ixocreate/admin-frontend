import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import * as moment from 'moment';
import { LocaleSettings } from 'primeng/components/calendar/calendar';
import { Calendar } from 'primeng/primeng';
import { DefaultHelper } from '../../helpers/default.helper';
import { IxoDateTimePipe } from '../../pipes/ixo-date-time.pipe';
import { IxoDatePipe } from '../../pipes/ixo-date.pipe';
import { IxoTimePipe } from "../../pipes/ixo-time.pipe";
import { NotificationService } from '../../services/notification.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'formly-field-datetime',
  template: `
    <div class="calendar-group">
      <div class="input-group">
        <input type="text"
               class="form-control"
               [(ngModel)]="formattedDate"
               (change)="onChange($event)"
               [placeholder]="to.placeholder"
               [class.is-invalid]="showError"
               [disabled]="to.disabled">

        <!--
        [monthNavigator]="true"
        [yearNavigator]="true"
        yearRange="1900:2030"
        -->
        <div class="input-group-append" *ngIf="!to.required && !to.disabled">
          <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </div>
      <div class="calender-overlay" [hidden]="!showOverlay">
        <p-calendar class="date-picker"
                    [inline]="true"
                    [placeholder]="to.placeholder"
                    [(ngModel)]="dateValue"
                    [locale]="locale"
                    [showTime]="calendarConfig.showTime"
                    [disabled]="to.disabled"
                    [class.is-invalid]="showError"
        >
        </p-calendar>
      </div>
    </div>
  `,
})
export class FormlyFieldDateTimeComponent extends CustomFieldTypeAbstract implements OnInit {

  @ViewChild(Calendar) calendar: Calendar;

  _date: Date;
  locale: LocaleSettings;
  showOverlay = false;
  formattedDate = '';

  calendarConfig = {
    showTime: true,
    useUtcTime: false,
  };

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
    super();
  }

  ngOnInit() {
    super.ngOnInit();

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
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Today',
      clear: 'Clear',
      dateFormat: this.config.dateFormat,
    };

    this.calendarConfig = {
      ...this.calendarConfig,
      ...this.to.config,
    };

    if (this.value) {
      this._date = moment(this.value).toDate();
      this.formattedDate = moment(this.dateValue).format(this.inputFormat);
    }
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
    if (this.calendarConfig.showTime) {
      return this.config.dateFormat + ' ' + this.config.timeFormat;
    }
    return this.config.dateFormat;
  }

  set dateValue(value: Date) {
    this.setValue(moment(value).utc(this.calendarConfig.useUtcTime).seconds(0).toISOString());
    this._date = value;
    const dateForFormat = moment(this.dateValue);
    this.formattedDate = dateForFormat.isValid() ? dateForFormat.format(this.inputFormat) : '';
  }

  get dateValue() {
    return this._date;
  }
}
