import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

@Component({
  selector: 'formly-field-color',
  templateUrl: './formly-field-color.component.html'
})
export class FormlyFieldColorComponent extends CustomFieldTypeAbstract implements OnInit {
}
