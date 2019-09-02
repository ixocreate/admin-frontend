import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AnnotatedMedia } from '../formly-field-media.component.model';

@Component({
  selector: 'app-formly-field-annotated-image',
  templateUrl: './formly-field-annotated-image.component.html'
})
export class FormlyFieldAnnotatedImageComponent {

  @Input()
  model: AnnotatedMedia;

  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
        placeholder: 'Add a new title',
        required: true,
      },
    },
    {
      key: 'body',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Add a description',
        required: true,
      },
    },
  ];

  submit() {
    alert(JSON.stringify(this.model));
  }
}
