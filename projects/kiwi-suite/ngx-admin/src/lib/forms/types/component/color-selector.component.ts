import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'color-selector',
    templateUrl: './color-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorSelectorComponent),
            multi: true
        }
    ]
})
export class ColorSelectorComponent implements ControlValueAccessor {
    @Input('colorLabel') colorLabel: string;

    color: string;
    internalColor: string;
    onChange = (color: string) => {

    };
    onTouched = () => {
    };

    constructor() {
    }


    registerOnChange(fn: (color: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(color: string): void {

        this.color = color;
        this.onChange(this.color);
    }

    remove() {
        this.writeValue(null);
    }
}
