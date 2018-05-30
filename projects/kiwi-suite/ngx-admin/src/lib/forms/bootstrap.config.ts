import {ConfigOption} from '@ngx-formly/core';
import {TemplateAddons} from './run/addon';
import {TemplateDescription} from './run/description';
import {TemplateValidation} from './run/validation';
import {
    FormlyFieldCheckbox,
    FormlyFieldDateTime,
    FormlyFieldDynamic,
    FormlyFieldInput,
    FormlyFieldMedia,
    FormlyFieldMultiCheckbox,
    FormlyFieldQuill,
    FormlyFieldRadio,
    FormlyFieldRepeatable,
    FormlyFieldSelect,
    FormlyFieldSelectNative,
    FormlyFieldTextArea,
} from './types/types';
import {
    FormlyWrapperAddons,
    FormlyWrapperDescription,
    FormlyWrapperFieldset,
    FormlyWrapperLabel,
    FormlyWrapperSection,
    FormlyWrapperValidationMessages
} from './wrappers/wrappers';

export const FIELD_TYPE_COMPONENTS = [
    // types
    FormlyFieldCheckbox,
    FormlyFieldDateTime,
    FormlyFieldDynamic,
    FormlyFieldInput,
    FormlyFieldMedia,
    FormlyFieldMultiCheckbox,
    FormlyFieldRadio,
    FormlyFieldRepeatable,
    FormlyFieldSelectNative,
    FormlyFieldSelect,
    FormlyFieldTextArea,
    FormlyFieldQuill,

    // wrappers
    FormlyWrapperLabel,
    FormlyWrapperDescription,
    FormlyWrapperValidationMessages,
    FormlyWrapperFieldset,
    FormlyWrapperAddons,
    FormlyWrapperSection,
];

export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
    types: [
        {
            name: 'input',
            component: FormlyFieldInput,
            wrappers: ['fieldset', 'label'],
        },
        {
            name: 'checkbox',
            component: FormlyFieldCheckbox,
            wrappers: ['fieldset'],
            defaultOptions: {
                templateOptions: {
                    indeterminate: true,
                },
            },
        },
        {
            name: 'radio',
            component: FormlyFieldRadio,
            wrappers: ['fieldset', 'label'],
            defaultOptions: {
                templateOptions: {
                    options: [],
                },
            },
        },
        {
            name: 'select',
            component: FormlyFieldSelect,
            wrappers: ['fieldset', 'label'],
            defaultOptions: {
                templateOptions: {
                    options: [],
                },
            },
        },
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
            name: 'textarea',
            component: FormlyFieldTextArea,
            wrappers: ['fieldset', 'label'],
            defaultOptions: {
                templateOptions: {
                    cols: 1,
                    rows: 1,
                },
            },
        },
        {
            name: 'multicheckbox',
            component: FormlyFieldMultiCheckbox,
            wrappers: ['fieldset', 'label'],
            defaultOptions: {
                templateOptions: {
                    options: [],
                },
            },
        },
        // custom
        {
            name: 'datetime',
            component: FormlyFieldDateTime,
            wrappers: ['fieldset', 'label'],
            defaultOptions: {
                templateOptions: {
                    /**
                     * bsConfig
                     */
                    config: {
                        dateInputFormat: 'YYYY-MM-DD HH:mm'
                    }
                }
            },
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
                    /**
                     * quill config
                     */
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
                        ]
                    }
                },
            },
        },
    ],
    wrappers: [
        {name: 'label', component: FormlyWrapperLabel},
        {name: 'description', component: FormlyWrapperDescription},
        {name: 'validation-message', component: FormlyWrapperValidationMessages},
        {name: 'fieldset', component: FormlyWrapperFieldset},
        {name: 'addons', component: FormlyWrapperAddons},
        {name: 'section', component: FormlyWrapperSection},
    ],
    manipulators: [
        {class: TemplateDescription, method: 'run'},
        {class: TemplateValidation, method: 'run'},
        {class: TemplateAddons, method: 'run'},
    ],
};
