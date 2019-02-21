import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../services/config.service';

@Pipe({
  name: 'kiwiDate',
})
export class KiwiDatePipe extends DatePipe implements PipeTransform {

  constructor(private config: ConfigService) {
    super('en');
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    let dateFormat = 'yyyy-MM-dd';
    if (this.config.userLocaleConfig && this.config.userLocaleConfig.dateFormat) {
      dateFormat = this.config.userLocaleConfig.dateFormat;
    }
    return super.transform(value, dateFormat);
  }

}
