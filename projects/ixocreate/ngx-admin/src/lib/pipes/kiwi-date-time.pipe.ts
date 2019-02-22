import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as moment from 'moment';

@Pipe({
  name: 'kiwiDateTime',
})
export class KiwiDateTimePipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  get formatString(): string {
    let format = 'YYYY-MM-DD HH:mm';
    if (this.config.userLocaleConfig && this.config.userLocaleConfig.dateTimeFormat) {
      format = this.config.userLocaleConfig.dateTimeFormat;
    }
    return format;
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    return moment(value).format(this.formatString);
  }

}
