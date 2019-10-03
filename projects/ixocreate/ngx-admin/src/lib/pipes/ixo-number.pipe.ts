import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Pipe({
  name: 'ixoNumber',
})
export class IxoNumberPipe implements PipeTransform {

  constructor(private config: ConfigService) {
  }

  transform(value: any, digitsInfo?: string, locale?: string): string | null {
    return formatNumber(value, locale || this.config.numberLocale, digitsInfo);
  }
}
