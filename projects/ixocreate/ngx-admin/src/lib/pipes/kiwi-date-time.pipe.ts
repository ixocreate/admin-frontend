import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as moment from 'moment';

@Pipe({
  name: 'kiwiDateTime',
})
export class KiwiDateTimePipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    let dateFormat = 'YYYY-MM-DD HH:mm';
    if (this.config.userLocaleConfig && this.config.userLocaleConfig.dateTimeFormat) {
      dateFormat = this.config.userLocaleConfig.dateTimeFormat;
    }
    return moment(value).format(dateFormat);
  }

}
