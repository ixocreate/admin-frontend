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

export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldSelectComponent,
  FormlyFieldMediaComponent,
  FormlyFieldDateTimeComponent,
  FormlyFieldLinkComponent,
  FormlyFieldColorComponent,
  FormlyFieldYouTubeComponent,

  // wrappers
  FormlyWrapperFormFieldComponent,
  FormlyWrapperSectionComponent,
  FormlyWrapperTabsetComponent,
  FormlyWrapperTabComponent,
];

export const KIWI_BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  validationMessages: [
    {name: 'required', message: 'This field is required'},
    {name: 'custom', message: (err) => err },
  ],
  types: [
    {
      name: 'select',
      component: FormlyFieldSelectComponent,
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
    /*
    {
      name: 'selectnative',
      component: FormlyFieldSelectNative,
      wrappers: ['fieldset', 'label'],
      defaultOptions: {
        templateOptions: {
          options: [],
        },
      },
    },
    // custom
    {
      name: 'dynamic',
      component: FormlyFieldDynamic,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'youtube',
      component: FormlyFieldYouTube,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'repeat',
      component: FormlyFieldRepeatable,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'wysiwyg',
      component: FormlyFieldQuill,
      wrappers: ['fieldset', 'label'],
      defaultOptions: {
        templateOptions: {
          height: 200,
          modules: {
            toolbar: [
              // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              // [{'list': 'ordered'}, {'list': 'bullet'}],
              // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
              // [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
              // [{'header': [1, 2, 3, 4, 5, 6, false]}],
              // [{'align': []}],
              // ['clean'], // remove formatting button
              // ['link'],
            ],
          },
        },
      },
    },
    */
  ],
  wrappers: [
    {name: 'form-field', component: FormlyWrapperFormFieldComponent},
    {name: 'section', component: FormlyWrapperSectionComponent},
    {name: 'tabset', component: FormlyWrapperTabsetComponent},
    {name: 'tab', component: FormlyWrapperTabComponent},
  ],
};
