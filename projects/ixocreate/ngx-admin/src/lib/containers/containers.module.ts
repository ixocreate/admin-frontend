import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IxoComponentsModule } from '../components/ixo-components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    IxoComponentsModule,
  ]
})
export class ContainersModule {
}
