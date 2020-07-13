import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldCheckboxComponent } from './types/formly-field-checkbox/formly-field-checkbox.component';
import { FormlyFieldColorComponent } from './types/formly-field-color/formly-field-color.component';
import { FormlyFieldDateTimeComponent } from './types/formly-field-datetime/formly-field-datetime.component';
import { FormlyFieldDynamicComponent } from './types/formly-field-dynamic/fomly-field-dynamic.component';
import { FormlyFieldGeoPointComponent } from './types/formly-field-geo-point/formly-field-geo-point.component';
import { FormlyFieldLinkComponent } from './types/formly-field-link/formly-field-link.component';
import { FormlyFieldMediaAnnotatedComponent } from './types/formly-field-media-annotated/formly-field-media-annotated.component';
import { FormlyFieldMediaComponent } from './types/formly-field-media/formly-field-media.component';
import { FormlyFieldMultiCheckboxComponent } from './types/formly-field-multi-checkbox/formly-field-multi-checkbox.component';
import { FormlyFieldPriceComponent } from './types/formly-field-price/formly-field-price.component';
import { FormlyFieldQuillComponent } from './types/formly-field-quill/formly-field-quill.component';
import { FormlyFieldRepeatableComponent } from './types/formly-field-repeatable/formly-field-repeatable.component';
import { FormlyFieldSelectComponent } from './types/formly-field-select/formly-field-select.component';
import { FormlyFieldYouTubeComponent } from './types/formly-field-youtube/formly-field-youtube.component';
import { FormlyWrapperFormFieldOnlyComponent } from './wrappers/form-field-only.wrapper';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';
import { FormlyWrapperSectionComponent } from './wrappers/section.wrapper';
import { FormlyWrapperTabComponent } from './wrappers/tab.wrapper';
import { FormlyWrapperTabsetComponent } from './wrappers/tabset.wrapper';
import { FormlyFieldTableComponent } from './types/formly-field-table/formly-field-table.component';
import { quillModules } from './quill-modules.config';

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
      name: 'checkbox',
      component: FormlyFieldCheckboxComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'color',
      component: FormlyFieldColorComponent,
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
      name: 'datetime',
      component: FormlyFieldDateTimeComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'table',
      component: FormlyFieldTableComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'dynamic',
      component: FormlyFieldDynamicComponent,
      wrappers: ['form-field-only'],
    },
    {
      name: 'link',
      component: FormlyFieldLinkComponent,
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
      name: 'mediaAnnotated',
      component: FormlyFieldMediaAnnotatedComponent,
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
      name: 'repeatable',
      component: FormlyFieldRepeatableComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'select',
      component: FormlyFieldSelectComponent,
      wrappers: ['form-field'],
    },
    {
      name: 'wysiwyg',
      component: FormlyFieldQuillComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          height: 200,
          modules: quillModules,
        },
      },
    },
    {
      name: 'youtube',
      component: FormlyFieldYouTubeComponent,
      wrappers: ['form-field'],
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
