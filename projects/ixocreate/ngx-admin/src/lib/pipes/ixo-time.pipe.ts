import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';

@Pipe({
  name: 'ixoTime',
})
export class IxoTimePipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  get formatString(): string {
    return this.config.timeFormat;
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    return moment(value).tz(this.config.timezone).locale(this.config.dateLocale).format(this.config.timeFormat);
  }

}
