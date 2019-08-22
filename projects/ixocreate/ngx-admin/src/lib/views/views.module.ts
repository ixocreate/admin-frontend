import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxoComponentsModule } from '../components/ixo-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { MediaComponent } from './media/media.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RegistryComponent } from './registry/registry.component';
import { ResourceComponent } from './resource/resource.component';
import { TranslationComponent } from './translation/translation.component';
import { UserComponent } from './user/user.component';
import { PageModule } from './page/page.module';
import { MediaEditComponent } from './media/edit/media-edit.component';
import { RegistryEditComponent } from './registry/edit/registry-edit.component';
import { ResourceCreateComponent } from './resource/create/resource-create.component';
import { ResourceEditComponent } from './resource/edit/resource-edit.component';
import { TranslationEditComponent } from './translation/edit/translation-edit.component';
import { TranslationListComponent } from './translation/list/translation-list.component';
import { UserCreateComponent } from './user/create/user-create.component';
import { UserEditComponent } from './user/edit/user-edit.component';
import { FormlyModule } from '@ngx-formly/core';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';

const COMPONENTS = [
  AccountComponent,
  DashboardComponent,
  ErrorComponent,
  MediaComponent,
  MediaEditComponent,
  RedirectComponent,
  RegistryComponent,
  RegistryEditComponent,
  ResourceComponent,
  ResourceCreateComponent,
  ResourceEditComponent,
  TranslationComponent,
  TranslationEditComponent,
  TranslationListComponent,
  UserComponent,
  UserCreateComponent,
  UserEditComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    IxoComponentsModule,
    PipesModule,
    PageModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  exports: COMPONENTS
})
export class ViewsModule {
}
