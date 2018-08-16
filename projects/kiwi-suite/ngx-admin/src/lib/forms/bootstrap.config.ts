import { ConfigOption } from '@ngx-formly/core';
import {
  FormlyWrapperSection,
  FormlyWrapperTab,
  FormlyWrapperTabset,
} from './wrappers';
import { FormlyFieldMediaComponent } from './types/media';

export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldMediaComponent,

  // wrappers
  FormlyWrapperSection,
  FormlyWrapperTabset,
  FormlyWrapperTab,
];

export const KIWI_BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  validationMessages: [
    {name: 'required', message: 'This field is required'},
  ],
  types: [
    {
      name: 'media',
      component: FormlyFieldMediaComponent,
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
    {
      name: 'link',
      component: FormlyFieldLink,
      wrappers: ['fieldset', 'label'],
      defaultOptions: {},
    },
    // custom
    {
      name: 'datetime',
      component: FormlyFieldDateTime,
      wrappers: ['fieldset', 'label'],
      defaultOptions: {
        templateOptions: {
          config: {
            dateInputFormat: 'YYYY-MM-DD HH:mm',
          },
        },
      },
    },
    {
      name: 'date',
      component: FormlyFieldDate,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'dynamic',
      component: FormlyFieldDynamic,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'media',
      component: FormlyFieldMedia,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'youtube',
      component: FormlyFieldYouTube,
      wrappers: ['fieldset', 'label'],
    },
    {
      name: 'color',
      component: FormlyFieldColor,
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
    {name: 'section', component: FormlyWrapperSection},
    {name: 'tabset', component: FormlyWrapperTabset},
    {name: 'tab', component: FormlyWrapperTab},
  ],
};
