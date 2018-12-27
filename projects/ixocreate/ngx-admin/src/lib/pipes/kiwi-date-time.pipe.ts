import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'kiwiDateTime',
})
export class KiwiDateTimePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return 'no date';
    }
    return super.transform(value, 'yyyy-MM-dd HH:mm');
  }

}
