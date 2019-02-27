import { ModuleWithProviders, NgModule } from '@angular/core';
import { KeyValuePipe } from './keyvalue.pipe';
import { IxoDatePipe } from './ixo-date.pipe';
import { IxoDateTimePipe } from './ixo-date-time.pipe';
import { IxoFileSizePipe } from './ixo-file-size.pipe';

const COMPONENTS = [
  KeyValuePipe,
  IxoDatePipe,
  IxoDateTimePipe,
  IxoFileSizePipe,
];

@NgModule({
  imports: [],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class PipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesModule,
      providers: [
        ...COMPONENTS,
      ],
    };
  }
}
