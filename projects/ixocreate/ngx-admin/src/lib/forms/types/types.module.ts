import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FileUploadModule } from 'ng2-file-upload';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { IxoComponentsModule } from '../../components/ixo-components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PageModule } from '../../views/page/page.module';
import { IXO_BOOTSTRAP_FORMLY_CONFIG } from '../bootstrap.config';
import { FormlyFieldCheckboxComponent } from './formly-field-checkbox/formly-field-checkbox.component';
import { FormlyFieldColorComponent } from './formly-field-color/formly-field-color.component';
import { FormlyFieldDateTimeComponent } from './formly-field-datetime/formly-field-datetime.component';
import { FormlyFieldDynamicComponent } from './formly-field-dynamic/fomly-field-dynamic.component';
import { FormlyFieldGeoPointComponent } from './formly-field-geo-point/formly-field-geo-point.component';
import { FormlyFieldLinkComponent } from './formly-field-link/formly-field-link.component';
import { FormlyFieldMediaAnnotatedComponent } from './formly-field-media-annotated/formly-field-media-annotated.component';
import { FormlyFieldMediaComponent } from './formly-field-media/formly-field-media.component';
import { FormlyFieldMultiCheckboxComponent } from './formly-field-multi-checkbox/formly-field-multi-checkbox.component';
import { FormlyFieldPriceComponent } from './formly-field-price/formly-field-price.component';
import { FormlyFieldQuillComponent } from './formly-field-quill/formly-field-quill.component';
import { FormlyFieldRepeatableComponent } from './formly-field-repeatable/formly-field-repeatable.component';
import { FormlyFieldSelectComponent } from './formly-field-select/formly-field-select.component';
import { FormlyFieldYouTubeComponent } from './formly-field-youtube/formly-field-youtube.component';

const COMPONENTS = [
  FormlyFieldCheckboxComponent,
  FormlyFieldColorComponent,
  FormlyFieldDateTimeComponent,
  FormlyFieldDynamicComponent,
  FormlyFieldGeoPointComponent,
  FormlyFieldLinkComponent,
  FormlyFieldMediaComponent,
  FormlyFieldMediaAnnotatedComponent,
  FormlyFieldMultiCheckboxComponent,
  FormlyFieldPriceComponent,
  FormlyFieldQuillComponent,
  FormlyFieldRepeatableComponent,
  FormlyFieldSelectComponent,
  FormlyFieldYouTubeComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    IxoComponentsModule,
    FormsModule,
    PipesModule,
    PageModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FileUploadModule,
    NgSelectModule,
    CalendarModule,
    ColorPickerModule,
    DirectivesModule,
    NgxDnDModule,
    NgxChartsModule,
    CommonModule,

    FormlyModule.forRoot(IXO_BOOTSTRAP_FORMLY_CONFIG),
    QuillModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: COMPONENTS
})
export class TypesModule {
}
