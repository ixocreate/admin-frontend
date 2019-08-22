import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IxoBreadcrumbComponent } from './ixo-breadcrumb.component';
import { IxoBreadcrumbService } from './ixo-breadcrumb.service';

@NgModule({
  declarations: [IxoBreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [IxoBreadcrumbService],
  exports: [IxoBreadcrumbComponent]
})
export class IxoBreadcrumbModule {
}
