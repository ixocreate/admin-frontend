import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'date-selector',
    templateUrl: './date-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateSelectorComponent),
            multi: true
        }
    ]
})
export class DateSelectorComponent implements ControlValueAccessor {
    @Input('dateLabel') dateLabel: string;

    date: string;
    bsValue: any;

    onChange = (date: string) => {

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

    writeValue(date: string): void {
        if (date === this.date) {
            return;
        }
        this.date = date;
        this.onChange(this.date);
        if (this.date === null) {
            this.bsValue = null;
            return;
        }
        const parts = this.date.split('-');
        this.bsValue = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }

    onValueChange(event: Date) {
        if (!event) {
            this.writeValue(null);
            return;
        }

        const dateString = event.getFullYear() + "-" + ('0' + (event.getMonth() + 1)).slice(-2) + "-" + ('0' + event.getDate()).slice(-2);
        this.writeValue(dateString)
    }
}
