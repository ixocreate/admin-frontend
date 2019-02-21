import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as moment from 'moment';

@Pipe({
  name: 'kiwiDate',
})
export class KiwiDatePipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    let dateFormat = 'YYYY-MM-DD';
    if (this.config.userLocaleConfig && this.config.userLocaleConfig.dateFormat) {
      dateFormat = this.config.userLocaleConfig.dateFormat;
    }
    return moment(value).format(dateFormat);
  }

}
