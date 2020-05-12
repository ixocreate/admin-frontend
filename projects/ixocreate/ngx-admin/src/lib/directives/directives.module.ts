import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { DropdownDirective } from './dropdown.directive';
import { PermissionDirective } from './permission.directive';
import { AutosizeDirective } from './autosize.directive';

const DIRECTIVES = [
  ClickStopPropagationDirective,
  DropdownDirective,
  PermissionDirective,
  AutosizeDirective,
];

@NgModule({
  declarations: DIRECTIVES,
  imports: [
    CommonModule
  ],
  exports: DIRECTIVES
})
export class DirectivesModule {
}
