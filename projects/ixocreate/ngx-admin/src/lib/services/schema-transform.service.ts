import {Injectable} from '@angular/core';

export interface Schema {
  key: string;
  type: string;
  templateOptions: { [key: string]: any };
}

@Injectable()
export class SchemaTransformService {

  private transformers: { [inputType: string]: (value: any, transformer: SchemaTransformService) => any } = {};

  constructor() {
    this.registerTransform('section', this.handleSection);
    this.registerTransform('tabbedGroup', this.handleTabbedGroup);
    this.registerTransform('blockContainer', this.handleBlockContainer);
    this.registerTransform('collection', this.handleDynamic);

    this.registerTransform('text', this.handleDefault('input'));
    this.registerTransform('number', this.handleDefault('input', {type: 'number'}));
    this.registerTransform('textarea', this.handleDefault('textarea', {rows: 3}));
    this.registerTransform('checkbox', this.handleDefault('checkbox'));
    this.registerTransform('radio', this.handleRadio);

    this.registerTransform('date', this.handleDefault('date'));
    this.registerTransform('datetime', this.handleDefault('datetime'));
    this.registerTransform('link', this.handleDefault('link'));
    this.registerTransform('youtube', this.handleDefault('youtube', {centerLabel: true}));
    this.registerTransform('color', this.handleDefault('color'));
    this.registerTransform('select', this.handleSelect);
    this.registerTransform('multiselect', this.handleMultiSelect);
    this.registerTransform('map', this.handleDefault('map'));
    this.registerTransform('price', this.handleDefault('price', {}, ['currencies', 'decimal']));

    this.registerTransform('html', this.handleDefault('wysiwyg'));

    this.registerTransform('media', this.handleDefault('media', {centerLabel: true, type: ''}));
    this.registerTransform('image', this.handleDefault('media', {centerLabel: true, type: 'image'}));
    this.registerTransform('document', this.handleDefault('media', {centerLabel: true, type: 'document'}));
    this.registerTransform('audio', this.handleDefault('media', {centerLabel: true, type: 'audio'}));
    this.registerTransform('video', this.handleDefault('media', {centerLabel: true, type: 'video'}));
  }

  registerTransform(inputType: string, callback: (value: any, transformer: SchemaTransformService) => any) {
    this.transformers[inputType] = callback;
  }

  transformForm(form: any): any {
    const formSchema = [];
    form.forEach((value) => {
      if (this.transformers[value.inputType]) {
        formSchema.push(this.transformers[value.inputType](value, this));
      }
    });
    return formSchema;
  }

  private handleDefault(type: string, templateOptions: any = {}, keysToTemplateOptions: Array<string> = []) {
    return (value: any): Schema => {
      const data = {
        key: value.name,
        type: type,
        templateOptions: {
          label: value.label,
          description: value.description,
          placeholder: value.placeholder || value.label + '...',
          required: value.required,
          disabled: value.disabled,
          ...templateOptions,
        },
      };
      keysToTemplateOptions.forEach((key) => {
        data.templateOptions[key] = value[key];
      });
      return data;
    };
  }

  private handleDynamic(value: any, transformer: SchemaTransformService): any {
    const groups = [];

    value.elements.forEach((element) => {
      groups.push({
        _type: element.name,
        templateOptions: {
          label: element.label,
          description: element.description,
          collapsed: false,
          allowCopy: false,
        },
        fieldGroup: transformer.transformForm(element.elements),
      });
    });

    return {
      key: value.name,
      type: 'dynamic',
      templateOptions: {
        label: value.label,
        description: value.description,
      },
      fieldArray: [],
      fieldGroups: groups,
    };
  }

  private handleBlockContainer(value: any, transformer: SchemaTransformService): any {
    const groups = [];

    value.elements.forEach((element) => {
      groups.push({
        _type: element.name,
        templateOptions: {
          label: element.label,
          description: element.description,
          collapsed: false,
          allowCopy: true,
        },
        fieldGroup: transformer.transformForm(element.elements),
      });
    });

    return {
      key: value.name,
      type: 'dynamic',
      templateOptions: {
        label: value.label,
      },
      fieldArray: [],
      fieldGroups: groups,
    };
  }

  private handleTabbedGroup(value: any, transformer: SchemaTransformService): any {
    const groups = [];

    value.elements.forEach(element => {
      groups.push({
        wrappers: ['tab'],
        templateOptions: {
          label: element.label,
          description: element.description,
          icon: element.icon,
          name: element.name
        },
        fieldGroup: transformer.transformForm(element.elements),
        elements: element.elements,
      });
    });

    return {
      wrappers: ['tabset'],
      templateOptions: {
        label: value.label,
        description: value.description,
        name: value.name
      },
      fieldGroup: groups,
    };
  }

  private handleSection(value: any, transformer: SchemaTransformService): any {
    return {
      wrappers: ['section'],
      templateOptions: {
        label: value.label,
        description: value.description,
        icon: value.icon ? 'fa fa-fw ' + value.icon : false,
        name: value.name,
      },
      fieldGroup: transformer.transformForm(value.elements),
    };
  }

  private handleSelect(value: any, transformer: SchemaTransformService): Schema {
    const options = [];

    for (const key in value.options) {
      if (value.options.hasOwnProperty(key)) {
        options.push({
          value: key,
          label: value.options[key]
        });
      }
    }

    return transformer.handleDefault('select', {
      options: options,
      resource: value.resource,
      clearable: value.clearable || false,
    })(value);
  }

  private handleRadio(value: any, transformer: SchemaTransformService): Schema {
    const options = [];

    for (const key in value.options) {
      if (value.options.hasOwnProperty(key)) {
        options.push({value: key, label: value.options[key]});
      }
    }

    return transformer.handleDefault('radio', {
      options: options,
      description: value.description,
      resource: value.resource,
      clearable: value.clearable || false,
      labelProp: 'label',
      valueProp: 'value',
    })(value);
  }

  private handleMultiSelect(value: any, transformer: SchemaTransformService): Schema {
    const data = transformer.handleSelect(value, transformer);
    data.templateOptions = Object.assign({
      ...data.templateOptions,
      multiple: true,
      clearable: value.clearable || true,
    });
    return data;
  }
}
