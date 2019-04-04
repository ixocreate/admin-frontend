import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'ixoDate',
})
export class IxoDatePipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  get formatString(): string {
    return this.config.dateFormat;
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    return moment(value).locale(this.config.dateLocale).format(this.config.dateFormat);
  }

}
