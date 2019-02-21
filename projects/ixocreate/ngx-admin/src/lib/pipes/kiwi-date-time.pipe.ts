import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../services/config.service';

@Pipe({
  name: 'kiwiDateTime',
})
export class KiwiDateTimePipe extends DatePipe implements PipeTransform {

  constructor(private config: ConfigService) {
    super('en');
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    let dateFormat = 'yyyy-MM-dd HH:mm';
    if (this.config.userLocaleConfig && this.config.userLocaleConfig.dateTimeFormat) {
      dateFormat = this.config.userLocaleConfig.dateTimeFormat;
    }
    return super.transform(value, dateFormat);
  }

}
