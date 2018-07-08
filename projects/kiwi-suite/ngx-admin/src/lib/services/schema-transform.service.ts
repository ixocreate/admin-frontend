export class SchemaTransformService {

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
            switch (value.inputType) {
                case 'section':
                    formSchema.push(this.handleSection(value));
                    break;
                case 'tabbedGroup':
                    formSchema.push(this.handleTabbedGroup(value));
                    break;
                case 'blockContainer':
                    formSchema.push(this.handleBlockContainer(value));
                    break;

                case 'select':
                    formSchema.push(this.handleSelect(value));
                    break;
                case 'datetime':
                    formSchema.push(this.handleDatetime(value));
                    break;
                case 'date':
                    formSchema.push(this.handleDate(value));
                    break;
                case 'image':
                    formSchema.push(this.handleImage(value));
                    break;
                case 'text':
                    formSchema.push(this.handleText(value));
                    break;
                case 'html':
                    formSchema.push(this.handleHtml(value));
                    break;
                case 'link':
                    formSchema.push(this.handleLink(value));
                    break;
                case 'textarea':
                    formSchema.push(this.handleTextarea(value));
                    break;
            }
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
}
