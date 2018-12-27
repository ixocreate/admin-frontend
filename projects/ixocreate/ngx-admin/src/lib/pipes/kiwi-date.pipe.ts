import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'kiwiDate'
})
export class KiwiDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return 'no date';
    }
    return super.transform(value, 'YYYY-MM-DD');
  }

}
