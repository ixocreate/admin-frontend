import {Injectable} from '@angular/core';

@Injectable()
export class SchemaTransformService {
    private transformers: {inputType: string, callback: (value: any) => any}[] = [];

    constructor()
    {
        this.registerTransform('section', this.handleSection);
        this.registerTransform('tabbedGroup', this.handleTabbedGroup);
        this.registerTransform('blockContainer', this.handleBlockContainer);
        this.registerTransform('collection', this.handleCollection);
        this.registerTransform('select', this.handleSelect);
        this.registerTransform('multiselect', this.handleMultiSelect);
        this.registerTransform('datetime', this.handleDatetime);
        this.registerTransform('date', this.handleDate);
        this.registerTransform('image', this.handleImage);
        this.registerTransform('text', this.handleText);
        this.registerTransform('youtube', this.handleYouTube);
        this.registerTransform('color', this.handleColor);
        this.registerTransform('html', this.handleHtml);
        this.registerTransform('link', this.handleLink);
        this.registerTransform('checkbox', this.handleCheckbox);
        this.registerTransform('textarea', this.handleTextarea);
    }

    registerTransform(inputType: string, callback: (value: any) => any )
    {
        this.transformers.push({
            inputType: inputType,
            callback: callback
        });
    }

    public transform(apiSchema: any): any {
        return {
            name: apiSchema.name,
            namePlural: apiSchema.namePlural,
            list: apiSchema.list,
            form: this.transformForm(apiSchema.form),
        };
    }



    public transformForm(form: any): any {
        const formSchema = [];

        form.forEach((value) => {
            this.transformers.forEach((transformer) => {
                if (transformer.inputType !== value.inputType) {
                   return;
                }

               formSchema.push(transformer.callback(value));
            });
        });

        return formSchema;
    }

    private handleBlockContainer(value: any): any
    {
        const groups = [];

        value.elements.forEach((element) => {
            groups.push({
                 _type: element.name,
                templateOptions: {
                     label: element.label
                },
                fieldGroup: this.transformForm(element.elements)
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
        }
    }

    private handleCollection(value: any): any
    {
        const groups = [];

        value.elements.forEach((element) => {
            groups.push({
                _type: element.name,
                templateOptions: {
                    label: element.label
                },
                fieldGroup: this.transformForm(element.elements)
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
        }
    }

    private handleTabbedGroup(value: any): any
    {
        const groups = [];

        value.elements.forEach((element) => {
            groups.push({
                wrappers: ['tab'],
                templateOptions: {
                    label: element.label
                },
                fieldGroup: this.transformForm(element.elements)
            });
        });

        return {
            wrappers: ['tabset'],
            templateOptions: {
                label: value.label,
            },
            fieldGroup: groups,
        }
    }

    private handleSection(value: any): any
    {
        return {
            wrappers: ['section'],
            templateOptions: {
                label: value.label,
                icon: 'fa fa-fw ' + value.icon,
            },
            fieldGroup: this.transformForm(value.elements),
        }
    }

    private handleSelect(value: any): any
    {
        const options = [];

        for (let key in value.options) {
            options.push({
                value: key,
                label: value.options[key]
            });
        }

        return {
            key: value.name,
            type: "select",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
                options: options,
                resource: value.resource,
            }
        }
    }

    private handleMultiSelect(value: any): any
    {
        const options = [];

        for (let key in value.options) {
            options.push({
                value: key,
                label: value.options[key]
            });
        }

        return {
            key: value.name,
            type: "select",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
                options: options,
                resource: value.resource,
                multiple: true
            }
        }
    }

    private handleText(value: any): any {
        return {
            key: value.name,
            type: "input",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }

    private handleCheckbox(value: any): any {
        return {
            key: value.name,
            type: "checkbox",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }

    private handleTextarea(value: any): any {
        return {
            key: value.name,
            type: "textarea",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }

    private handleImage(value: any): any {
        return {
            key: value.name,
            type: "media",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }

    private handleDate(value: any): any {
        return {
            key: value.name,
            type: "datetime",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
                config: {
                    dateInputFormat: "YYYY-MM-DD",
                },
            }
        };
    }

    private handleDatetime(value: any): any {
        return {
            key: value.name,
            type: "datetime",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
                config: {
                    dateInputFormat: "YYYY-MM-DD HH:mm:ss",
                },
            }
        };
    }

    private handleHtml(value: any): any {
        return {
            key: value.name,
            type: "wysiwyg",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
                height: 200,
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'align': []}],
                        ['clean'], // remove formatting button
                        ['link'],
                    ]
                }
            }
        };
    }

    private handleLink(value: any): any {
        return {
            key: value.name,
            type: "link",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }

    private handleYouTube(value: any): any {
        return {
            key: value.name,
            type: "youtube",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }

    private handleColor(value: any): any {
        return {
            key: value.name,
            type: "color",
            templateOptions: {
                label: value.label,
                placeholder: value.label,
                required: value.required,
            }
        };
    }
}
