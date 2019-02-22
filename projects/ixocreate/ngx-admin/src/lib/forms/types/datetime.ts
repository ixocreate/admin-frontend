import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import * as moment from 'moment';
import { LocaleSettings } from 'primeng/components/calendar/calendar';
import { Calendar } from 'primeng/primeng';
import { DefaultHelper } from '../../helpers/default.helper';
import { KiwiDateTimePipe } from '../../pipes/kiwi-date-time.pipe';
import { KiwiDatePipe } from '../../pipes/kiwi-date.pipe';
import { NotificationService } from '../../services/notification.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'formly-field-datetime',
  template: `
    <div class="calendar-group">
      <div class="input-group">
        <input type="text"
               class="form-control"
               [(ngModel)]="formatedDate"
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
  formatedDate = '';

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
              private kiwiDate: KiwiDatePipe,
              private kiwiDateTime: KiwiDateTimePipe) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.locale = {
      ...this.calendar.locale,
      firstDayOfWeek: 1,
    };
    if (this.value) {
      this._date = moment(this.value).toDate();
      this.formatedDate = moment(this.dateValue).format(this.formatDateString);
    }
    this.calendarConfig = {
      ...this.calendarConfig,
      ...this.to.config,
    };
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
    if (this.calendarConfig.showTime) {
      return this.kiwiDateTime.formatString;
    }
    return this.kiwiDate.formatString;
  }

  set dateValue(value: Date) {
    this.setValue(moment(value).utc(this.calendarConfig.useUtcTime).seconds(0).toISOString());
    this._date = value;
    const dateForFormat = moment(this.dateValue);
    this.formatedDate = dateForFormat.isValid() ? dateForFormat.format(this.formatDateString) : '';
  }

  get dateValue() {
    return this._date;
  }
}
