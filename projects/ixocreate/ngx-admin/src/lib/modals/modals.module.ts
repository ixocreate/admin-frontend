import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxoConfirmModalComponent } from './ixo-confirm-modal/ixo-confirm-modal.component';
import { IxoInputModalComponent } from './ixo-input-modal/ixo-input-modal.component';
import { IxoLinkSelectModalComponent } from './ixo-link-select-modal/ixo-link-select-modal.component';
import { IxoMapModalComponent } from './ixo-map-modal/ixo-map-modal.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IxoComponentsModule } from '../components/ixo-components.module';
import { IxoWysiwigModalComponent } from './ixo-wysiwig-modal/ixo-wysiwig-modal.component';
import { QuillModule } from 'ngx-quill';

const COMPONENTS = [
  IxoConfirmModalComponent,
  IxoInputModalComponent,
  IxoLinkSelectModalComponent,
  IxoWysiwigModalComponent,
  IxoMapModalComponent,
];

@NgModule({
  declarations: COMPONENTS,
  entryComponents: COMPONENTS,
  imports: [
    IxoComponentsModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    QuillModule.forRoot(),
  ],
  exports: COMPONENTS,
})
export class ModalsModule {
}
