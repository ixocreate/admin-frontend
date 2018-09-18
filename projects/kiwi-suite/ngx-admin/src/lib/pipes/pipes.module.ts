import { ModuleWithProviders, NgModule } from '@angular/core';
import { KeyValuePipe } from './keyvalue.pipe';
import { KiwiDatePipe } from './kiwi-date.pipe';
import { KiwiDateTimePipe } from './kiwi-date-time.pipe';
import { KiwiFileSizePipe } from './kiwi-file-size.pipe';

const COMPONENTS = [
  KeyValuePipe,
  KiwiDatePipe,
  KiwiDateTimePipe,
  KiwiFileSizePipe,
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
