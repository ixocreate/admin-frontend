import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {takeUntil} from 'rxjs/operators';
import {Media} from '../../../models';
import {ConfigurationService, MediaService} from '../../../services';
import {ResourceComponent} from '../../resource';

@Component({
    selector: 'media-list',
    templateUrl: './media-list.component.html',
})
export class MediaListComponent extends ResourceComponent implements OnInit {

    uploader: FileUploader;

    @Output() onSelect = new EventEmitter<Media>();

    select(media: Media) {
        this.onSelect.emit(media);
    }

    constructor(protected dataService: MediaService,
                protected config: ConfigurationService,
                protected domSanitizer: DomSanitizer,
                protected route: ActivatedRoute) {
        super(route);
    }

    ngOnInit() {
        this.config.ready$.pipe(takeUntil(this.destroyed$))
            .subscribe(
                () => {
                    this.uploader = new FileUploader({
                        url: this.dataService.uploadLink,
                        removeAfterUpload: true,
                        autoUpload: true,
                        headers: [
                            {
                                name: 'X-XSRF-TOKEN',
                                value: getDOM().getCookie('XSRF-TOKEN')
                            }
                        ]
                    });
                    this.uploader.onCompleteAll = () => {
                        this.dataService.load();
                    };
                });
    }

    isImage(mimeType: string): boolean {
        if (!mimeType || mimeType.length < 6) {
            return false;
        }
        return mimeType.substr(0, 6) === 'image/';
    }

    isSVG(mimeType: string): boolean {
        if (!mimeType || mimeType.length < 6) {
            return false;
        }
        return mimeType.indexOf('svg') !== -1;
    }

    mimeTypeIcon(mimeType: string): string {
        let icon = 'fa-file';
        if (mimeType.indexOf('pdf') > -1) {
            icon = 'fa-file-pdf-o';
        }
        if (mimeType.indexOf('image') > -1) {
            icon = 'fa-file-image-o';
        }
        return icon;
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

                    resolve(this.domSanitizer.bypassSecurityTrustUrl(reader.result));
                };
                reader.readAsDataURL(file);
            },
        );
    }
}
