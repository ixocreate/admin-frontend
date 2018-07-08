import {Component, forwardRef, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Link, Media} from "../../../models/resource.model";

@Component({
    selector: 'link-selector',
    templateUrl: './link-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LinkSelectorComponent),
            multi: true
        }
    ]
})
export class LinkSelectorComponent implements ControlValueAccessor, OnInit, OnDestroy {
    selectedType:string;
    linkValue: Link;
    modalRef: BsModalRef;
    onChange = (linkValue: Link) => {
        if (!linkValue) {
            this.selectedType = null;
            return;
        }
        this.selectedType = linkValue.type;
    };
    onTouched = () => {
    };

    constructor(private modalService: BsModalService) {
        //dataService.load();
    }

    ngOnInit() {
        if (!this.linkValue) {
            this.selectedType = 'media';
        } else {
            this.selectedType = this.linkValue.type;
        }
    }

    ngOnDestroy() {
        this.selectedType = null;
    }

    registerOnChange(fn: (linkValue: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(linkValue: Link): void {
        this.linkValue = linkValue;
        this.onChange(this.linkValue);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {
            backdrop: true,
            ignoreBackdropClick: false,
            class: 'modal-lg'
        });
    }

    remove() {
        this.writeValue(null);
        return false;
    }

    onSelectMedia(media: Media) {
        this.modalRef.hide();
        this.writeValue({
            type: 'media',
            value: media
        });
    }
}