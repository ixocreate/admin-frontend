import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IxoComponentsModule } from '../components/ixo-components.module';
import { RouterModule } from '@angular/router';
import { IframeComponent } from './iframe/iframe.component';

const COMPONENTS = [
  DefaultLayoutComponent,
  IframeComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    IxoComponentsModule,
    DirectivesModule
  ],
  exports: COMPONENTS
})
export class ContainersModule {
}
