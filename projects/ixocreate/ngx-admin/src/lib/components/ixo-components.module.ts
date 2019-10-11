import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxoAsideComponent } from './ixo-aside/ixo-aside.component';
import { IxoBreadcrumbModule } from './ixo-breadcrumb/ixo-breadcrumb.module';
import { IxoButtonComponent } from './ixo-button/ixo-button.component';
import { IxoLoadingComponent } from './ixo-loading/ixo-loading.component';
import { IxoContentComponent } from './ixo-content/ixo-content.component';
import { IxoDashboardComponent } from './ixo-dashboard/ixo-dashboard.component';
import { IxoDashboardElementComponent } from './ixo-dashboard-element/ixo-dashboard-element.component';
import { IxoDatatableComponent } from './ixo-datatable/ixo-datatable.component';
import { IxoDatePickerComponent } from './ixo-date-picker/ixo-date-picker.component';
import { IxoImageCropperComponent } from './ixo-image-cropper/ixo-image-cropper.component';
import { IxoMediaListComponent } from './ixo-media-list/ixo-media-list.component';
import { IxoPaginationComponent } from './ixo-pagination/ixo-pagination.component';
import { IxoSitemapComponent } from './ixo-sitemap/ixo-sitemap.component';
import { IxoSitemapItemComponent } from './ixo-sitemap-item/ixo-sitemap-item.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DirectivesModule } from '../directives/directives.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastrModule } from 'ngx-toastr';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const COMPONENTS = [
  IxoAsideComponent,
  IxoButtonComponent,
  IxoContentComponent,
  IxoDashboardComponent,
  IxoDashboardElementComponent,
  IxoDatatableComponent,
  IxoDatePickerComponent,
  IxoImageCropperComponent,
  IxoLoadingComponent,
  IxoMediaListComponent,
  IxoPaginationComponent,
  IxoSitemapComponent,
  IxoSitemapItemComponent,
  IxoLoadingComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot({
      autoDismiss: true,
      closeButton: true,
      maxOpened: 5,
      progressBar: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    }),
    NgxDatatableModule,
    IxoBreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CalendarModule,
    NgSelectModule,
    FileUploadModule,
    DirectivesModule,
    NgxDnDModule,
    NgxChartsModule,
    CommonModule
  ],
  exports: [
    IxoBreadcrumbModule,
    ...COMPONENTS
  ]
})
export class IxoComponentsModule {
}
