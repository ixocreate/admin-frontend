import { NgModule } from '@angular/core';
import { IxoDateTimePipe } from './ixo-date-time.pipe';
import { IxoDatePipe } from './ixo-date.pipe';
import { IxoFileSizePipe } from './ixo-file-size.pipe';
import { IxoNumberPipe } from './ixo-number.pipe';
import { IxoTimePipe } from './ixo-time.pipe';
import { KeyValuePipe } from './keyvalue.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

const COMPONENTS = [
  KeyValuePipe,
  IxoDatePipe,
  IxoDateTimePipe,
  IxoFileSizePipe,
  IxoNumberPipe,
  IxoTimePipe,
  SafeHtmlPipe
];

@NgModule({
  declarations: COMPONENTS,
  providers: COMPONENTS,
  exports: COMPONENTS,
})
export class PipesModule {
}
