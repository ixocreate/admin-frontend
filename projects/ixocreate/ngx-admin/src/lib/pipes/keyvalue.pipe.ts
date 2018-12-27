import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {

  transform(value: any, args?: any): Object[] {
    let keyArr: any[] = Object.keys(value);
    let dataArr = [];

    keyArr.forEach((key: any) => {
      dataArr.push({
          key: key,
          value: value[key],
      })
    });

    return dataArr;
  }

}
