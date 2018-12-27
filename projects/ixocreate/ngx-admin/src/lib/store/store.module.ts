import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class NgrxHelperModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgrxHelperModule,
    };
  }
}
