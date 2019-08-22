import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAddComponent } from './add/page-add.component';
import { IxoComponentsModule } from '../../components/ixo-components.module';
import { PageCreateComponent } from './create/page-create.component';
import { PageEditComponent } from './edit/page-edit.component';
import { FlatComponent } from './flat/flat.component';
import { FlatAddComponent } from './flat/flat-add.component';
import { FlatCreateComponent } from './flat/flat-create.component';
import { SubComponent } from './sub/sub.component';
import { SubAddComponent } from './sub/sub-add.component';
import { SubCreateComponent } from './sub/sub-create.component';
import { PageComponent } from './page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const COMPONENTS = [
  PageAddComponent,
  PageCreateComponent,
  PageEditComponent,
  FlatComponent,
  FlatAddComponent,
  FlatCreateComponent,
  SubComponent,
  SubAddComponent,
  SubCreateComponent,
  PageComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    TabsModule.forRoot(),
    IxoComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    NgSelectModule,
    NgxDatatableModule,
    CommonModule
  ],
  exports: COMPONENTS
})
export class PageModule {
}
