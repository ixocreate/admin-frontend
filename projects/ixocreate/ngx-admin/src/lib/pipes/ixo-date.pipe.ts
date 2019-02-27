import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as moment from 'moment';

@Pipe({
  name: 'ixoDate',
})
export class IxoDatePipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  get formatString(): string {
    let format = 'YYYY-MM-DD';
    if (this.config.userLocaleConfig && this.config.userLocaleConfig.dateFormat) {
      format = this.config.userLocaleConfig.dateFormat;
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
