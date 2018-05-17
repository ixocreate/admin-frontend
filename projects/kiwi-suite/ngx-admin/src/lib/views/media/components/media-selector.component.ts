import {Component, forwardRef, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Media} from '../../../models';

@Component({
    selector: 'media-selector',
    templateUrl: './media-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MediaSelectorComponent),
            multi: true
        }
    ]
})
export class MediaSelectorComponent implements ControlValueAccessor {
    media: Media;
    modalRef: BsModalRef;
    onChange = (media: Media) => {
    };
    onTouched = () => {
    };

    constructor(
        private modalService: BsModalService,
        private sanitizer: DomSanitizer,
    ) {
    }

    registerOnChange(fn: (media: Media) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(media: Media): void {
        this.media = media;
        this.onChange(this.media);
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
    }

    onSelect(media: Media) {
        this.modalRef.hide();
        this.writeValue(media);
    }

    isImage(mimeType: string): boolean {
        if (!mimeType || mimeType.length < 6) {
            return false;
        }

        if (mimeType.substr(0, 6) !== 'image/') {
            return false;
        }

        return true;
    }

    isSVG(mimeType: string): boolean {
        if (!mimeType || mimeType.length < 6) {
            return false;
        }

        if (mimeType.indexOf('svg') === -1) {
            return false;
        }

        return true;
    }

    mimeTypeIcon(mimeType: string): string {
        return 'fa-file';
    }

    base64Image(file?: File | Blob): Promise<SafeUrl> {
        return new Promise<SafeUrl>(
            (resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.error) {
                        reject(reader.error);
                        return;
                    }

                    resolve(this.sanitizer.bypassSecurityTrustUrl(reader.result));
                };
                reader.readAsDataURL(file);
            },
        );
    }
}
