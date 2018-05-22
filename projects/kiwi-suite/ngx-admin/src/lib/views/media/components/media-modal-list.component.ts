import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {FileUploader} from 'ng2-file-upload';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Media} from '../../../models';
import {ConfigurationService, MediaService} from '../../../services';

@Component({
    selector: 'media-modal-list',
    templateUrl: './media-modal-list.component.html',
})
export class MediaModalListComponent implements OnInit, OnDestroy {
    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    @Output() onSelect = new EventEmitter<Media>();

    select(media: Media) {
        this.onSelect.emit(media);
    }

    public uploader: FileUploader;

    constructor(protected dataService: MediaService,
                protected config: ConfigurationService,
                protected domSanitizer: DomSanitizer) {
        this.dataService.load();
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

    ngOnDestroy(): void {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    get models$() {
        return this.dataService.models$;
    }

    get destroyed$() {
        return this._destroyed$.asObservable();
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

                    resolve(this.domSanitizer.bypassSecurityTrustUrl(reader.result));
                };
                reader.readAsDataURL(file);
            },
        );
    }
}
