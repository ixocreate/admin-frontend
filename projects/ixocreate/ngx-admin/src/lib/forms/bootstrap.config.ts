import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';
import { FormlyWrapperSectionComponent } from './wrappers/section.wrapper';
import { FormlyWrapperTabsetComponent } from './wrappers/tabset.wrapper';
import { FormlyWrapperTabComponent } from './wrappers/tab.wrapper';
import { FormlyFieldMediaComponent } from './types/formly-field-media/formly-field-media.component';
import { FormlyFieldDateTimeComponent } from './types/formly-field-datetime/formly-field-datetime.component';
import { FormlyFieldLinkComponent } from './types/formly-field-link/formly-field-link.component';
import { FormlyFieldSelectComponent } from './types/formly-field-select/formly-field-select.component';
import { FormlyFieldColorComponent } from './types/formly-field-color/formly-field-color.component';
import { FormlyFieldYouTubeComponent } from './types/formly-field-youtube/formly-field-youtube.component';
import { FormlyFieldQuillComponent } from './types/formly-field-quill/formly-field-quill.component';
import { FormlyFieldCheckboxComponent } from './types/formly-field-checkbox/formly-field-checkbox.component';
import { FormlyFieldDynamicComponent } from './types/formly-field-dynamic/fomly-field-dynamic.component';
import { FormlyWrapperFormFieldOnlyComponent } from './wrappers/form-field-only.wrapper';
import { FormlyFieldPriceComponent } from './types/formly-field-price/formly-field-price.component';
import { FormlyFieldGeoPointComponent } from './types/formly-field-geo-point/formly-field-geo-point.component';
import { FormlyFieldMultiCheckboxComponent } from './types/formly-field-multi-checkbox/formly-field-multi-checkbox.component';

export function renderCustomError(error) {
  return error;
}

export const IXO_BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
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
      name: 'multiCheckbox',
      component: FormlyFieldMultiCheckboxComponent,
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
      name: 'map',
      component: FormlyFieldGeoPointComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'price',
      component: FormlyFieldPriceComponent,
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
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{list: 'ordered'}, {list: 'bullet'}],
                [{script: 'sub'}, {script: 'super'}],
                [{indent: '-1'}, {indent: '+1'}],
                [{header: [1, 2, 3, 4, 5, 6, false]}],
                [{align: []}],
                ['clean'],
                ['ixolink'], // TODO: Enable IxoLink: ['ixolink']
              ],
            },
          },
        },
      },
    },
    {
      name: 'dynamic',
      component: FormlyFieldDynamicComponent,
      wrappers: ['form-field-only'],
    },
  ],
  wrappers: [
    {name: 'form-field', component: FormlyWrapperFormFieldComponent},
    {name: 'form-field-only', component: FormlyWrapperFormFieldOnlyComponent},
    {name: 'section', component: FormlyWrapperSectionComponent},
    {name: 'tabset', component: FormlyWrapperTabsetComponent},
    {name: 'tab', component: FormlyWrapperTabComponent},
  ],
};
