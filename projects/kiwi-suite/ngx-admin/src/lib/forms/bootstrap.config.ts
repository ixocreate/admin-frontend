import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldMediaComponent } from './types/media';
import { FormlyWrapperSection } from './wrappers/section';
import { FormlyWrapperTabset } from './wrappers/tabset';
import { FormlyWrapperTab } from './wrappers/tab';
import { FormlyFieldDateTimeComponent } from './types/datetime';
import { FormlyFieldLinkComponent } from './types/link';
import { FormlyFieldSelectComponent } from './types/select';

export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldSelectComponent,
  FormlyFieldMediaComponent,
  FormlyFieldDateTimeComponent,
  FormlyFieldLinkComponent,

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
      defaultOptions: {
        templateOptions: {
          config: {
            showWeekNumbers: false,
            containerClass: 'theme-default',
            dateInputFormat: 'YYYY-MM-DD HH:mm:ss',
          },
        },
      },
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
