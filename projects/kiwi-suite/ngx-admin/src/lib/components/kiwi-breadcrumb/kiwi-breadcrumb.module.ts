import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KiwiBreadcrumbComponent } from './kiwi-breadcrumb.component';
import { KiwiBreadcrumbService } from './kiwi-breadcrumb.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [KiwiBreadcrumbComponent],
  declarations: [KiwiBreadcrumbComponent],
})
export class KiwiBreadcrumbModule {
  static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: KiwiBreadcrumbModule,
      providers: [
        KiwiBreadcrumbService,
      ],
    };
  }
}
