import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';
import { FormlyWrapperSectionComponent } from './wrappers/section.wrapper';
import { FormlyWrapperTabsetComponent } from './wrappers/tabset.wrapper';
import { FormlyWrapperTabComponent } from './wrappers/tab.wrapper';
import { FormlyFieldMediaComponent } from './types/media';
import { FormlyFieldDateTimeComponent } from './types/datetime';
import { FormlyFieldLinkComponent } from './types/link';
import { FormlyFieldSelectComponent } from './types/select';
import { FormlyFieldColorComponent } from './types/color';
import { FormlyFieldYouTubeComponent } from './types/youtube';
import { FormlyFieldQuillComponent } from './types/quill';
import { FormlyFieldCheckboxComponent } from './types/checkbox';
import { FormlyFieldDynamicComponent } from './types/dynamic';
import { FormlyFieldRepeatableComponent } from './types/repeatable';
import { FormlyWrapperFormFieldOnlyComponent } from './wrappers/form-field-only.wrapper';

export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldSelectComponent,
  FormlyFieldMediaComponent,
  FormlyFieldDateTimeComponent,
  FormlyFieldLinkComponent,
  FormlyFieldColorComponent,
  FormlyFieldYouTubeComponent,
  FormlyFieldQuillComponent,
  FormlyFieldCheckboxComponent,
  FormlyFieldRepeatableComponent,
  FormlyFieldDynamicComponent,

  // wrappers
  FormlyWrapperFormFieldComponent,
  FormlyWrapperFormFieldOnlyComponent,
  FormlyWrapperSectionComponent,
  FormlyWrapperTabsetComponent,
  FormlyWrapperTabComponent,
];

export function renderCustomError(error) {
  return error;
}

export const KIWI_BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  validationMessages: [
    {name: 'required', message: 'This field is required'},
    {name: 'custom', message: renderCustomError},
  ],
  types: [
    {
      name: 'select',
      component: FormlyFieldSelectComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'checkbox',
      component: FormlyFieldCheckboxComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'media',
      component: FormlyFieldMediaComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'link',
      component: FormlyFieldLinkComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'datetime',
      component: FormlyFieldDateTimeComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'date',
      component: FormlyFieldDateTimeComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          config: {
            showTime: false,
          },
        },
      },
    },
    {
      name: 'color',
      component: FormlyFieldColorComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'youtube',
      component: FormlyFieldYouTubeComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'wysiwyg',
      component: FormlyFieldQuillComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          height: 200,
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'align': []}],
              ['clean'],
              ['link'],
            ],
          },
        },
      },
    },
    {
      name: 'dynamic',
      component: FormlyFieldDynamicComponent,
      wrappers: ['form-field-only'],
    },
    /*
    {
      name: 'repeat',
      component: FormlyFieldRepeatableComponent,
      wrappers: ['form-field-only'],
    },
    */
  ],
  wrappers: [
    {name: 'form-field', component: FormlyWrapperFormFieldComponent},
    {name: 'form-field-only', component: FormlyWrapperFormFieldOnlyComponent},
    {name: 'section', component: FormlyWrapperSectionComponent},
    {name: 'tabset', component: FormlyWrapperTabsetComponent},
    {name: 'tab', component: FormlyWrapperTabComponent},
  ],
};
