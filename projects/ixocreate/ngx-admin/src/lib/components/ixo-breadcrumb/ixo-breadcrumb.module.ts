import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IxoBreadcrumbComponent } from './ixo-breadcrumb.component';
import { IxoBreadcrumbService } from './ixo-breadcrumb.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [IxoBreadcrumbComponent],
  declarations: [IxoBreadcrumbComponent],
})
export class IxoBreadcrumbModule {
  static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: IxoBreadcrumbModule,
      providers: [
        IxoBreadcrumbService,
      ],
    };
  }
}
