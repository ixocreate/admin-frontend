import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../@kiwi-suite/ngx-admin/src/services';
import {FileLikeObject, FileUploader} from "ng2-file-upload";
import {DomSanitizer, SafeUrl, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {ResourceListComponent} from '../../../@kiwi-suite/ngx-admin/src/views/resource/resource-list.component';

@Component({
    selector: 'app-media-list',
    templateUrl: './media-list.component.html',
})
export class MediaListComponent extends ResourceListComponent implements OnInit {

    protected pathPrefix = '';

    public uploader:FileUploader;

    ngOnInit() {
        super.ngOnInit();
        this.dataService.models$.subscribe(() => {
            this.uploader = new FileUploader({
                url: this.dataService.uploadLink,
                removeAfterUpload: true,
                autoUpload: true,
                headers: [
                    {
                        name: "X-XSRF-TOKEN",
                        value: getDOM().getCookie("XSRF-TOKEN")
                    }
                ]
            });
            this.uploader.onCompleteAll = () => {
                this.dataService.load();
            }
        });
    }

    get resourceNamePlural() {
        return 'Media';
    }

    isImage(mimeType:string): boolean {
        if (!mimeType || mimeType.length < 6) {
            return false;
        }

        if (mimeType.substr(0, 6) !== "image/") {
            return false;
        }

        return true;
    }

    isSVG(mimeType: string): boolean {
        if (!mimeType || mimeType.length < 6) {
            return false;
        }

        if (mimeType.indexOf("svg") === -1) {
            return false;
        }

        return true;
    }

    mimeTypeIcon(mimeType: string) : string
    {
        return "fa-file";
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
