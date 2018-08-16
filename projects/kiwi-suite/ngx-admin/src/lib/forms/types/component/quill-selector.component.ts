import {Component, ViewChild, forwardRef, OnInit, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import Quill from 'quill';

@Component({
    selector: 'quill-selector',
    template: `
        <quill-editor #editor
                      [ngModel]="data.html"
                      [style]="{height: height+'px'}"
                      [modules]="modules">
        </quill-editor>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => QuillSelectorComponent),
            multi: true
        }
    ]
})
export class QuillSelectorComponent implements ControlValueAccessor, OnInit {
    @ViewChild('editor') editor: QuillEditorComponent;

    @Input('modules') modules: any;
    @Input('height') height: string;

    data: {html: string, quill: Array<any>};

    onChange = (data: any) => {

    };
    onTouched = () => {
    };

    ngOnInit() {
        this.modules.keyboard = {
            bindings: {
                smartbreak: {
                    key: 13,
                    shiftKey: true,
                    handler: function (range, context) {
                        this.quill.setSelection(range.index, 'silent');
                        this.quill.insertText(range.index, '\n', 'user');
                        this.quill.setSelection(range.index + 1, 'silent');
                        this.quill.format('linebreak', true, 'user');
                    }
                },
                paragraph: {
                    key: 13,
                    handler: function (range, context) {
                        this.quill.setSelection(range.index, 'silent');
                        this.quill.insertText(range.index, '\n', 'user');
                        this.quill.setSelection(range.index + 1, 'silent');
                        const f = this.quill.getFormat(range.index + 1);
                        if (f.hasOwnProperty('linebreak')) {
                            delete(f.linebreak)
                            this.quill.removeFormat(range.index + 1);
                            for (let key in f) {
                                this.quill.formatText(range.index + 1, key, f[key]);
                            }
                        }
                    }
                }
            }
        };
        this.editor.onContentChanged.subscribe(data => {
            this.writeValue({
                html: data.html,
                quill: data.content,
            });
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }


    writeValue(data: any): void {
        if (!data) {
            data = {
                html: '',
                quill: []
            };
        }
        if (this.data && this.data.html && data.html && this.data.html === data.html) {
            return;
        }
        this.data = data;
        this.onChange(data);
    }
}
