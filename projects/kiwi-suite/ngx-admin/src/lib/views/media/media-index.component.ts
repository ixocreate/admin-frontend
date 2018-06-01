import {Component, OnInit} from '@angular/core';
import {SafeUrl, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {takeUntil} from 'rxjs/operators';
import {MediaService} from '../../services';
import {ResourceIndexComponent} from '../resource';

@Component({
    selector: 'app-media-list',
    templateUrl: './media-index.component.html',
})
export class MediaIndexComponent extends ResourceIndexComponent implements OnInit {

    protected pathPrefix = '';

    public uploader: FileUploader;

    constructor(protected dataService: MediaService,
                protected route: ActivatedRoute) {
        super(route);
    }

    ngOnInit() {
        super.ngOnInit();
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
