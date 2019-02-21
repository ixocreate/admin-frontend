import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue',
})
export class KeyValuePipe implements PipeTransform {

  transform(value: any, args?: any): object[] {
    const keyArr: any[] = Object.keys(value);
    const dataArr = [];

    keyArr.forEach((key: any) => {
      dataArr.push({
        key,
        value: value[key],
      });
    });

    return dataArr;
  }

}
