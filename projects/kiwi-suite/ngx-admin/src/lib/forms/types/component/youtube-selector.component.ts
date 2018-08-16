import {Component, forwardRef, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Link, Media} from "../../../models/resource.model";

@Component({
    selector: 'youtube-selector',
    templateUrl: './youtube-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => YoutubeSelectorComponent),
            multi: true
        }
    ]
})
export class YoutubeSelectorComponent implements ControlValueAccessor {
    youTubeKey: string;
    onChange = (youTubeKey: string) => {

    };
    onTouched = () => {
    };

    constructor() {
    }


    registerOnChange(fn: (youTubeKey: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(youTubeKey: string): void {

        this.youTubeKey = youTubeKey;
        this.onChange(this.youTubeKey);
    }

    remove() {
        this.writeValue(null);
    }

    onKey(event: any) {
        if (!event.target.value) {
            this.youTubeKey = null;

            return;
        }
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = event.target.value.match(regExp);
        if (match && match[2].length == 11) {
            this.writeValue(match[2]);
        } else {
            this.writeValue(null);
        }
    }
}
