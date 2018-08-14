import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { ConfigService } from '../../services/config.service';
import { Media } from '../../interfaces/media.interface';
import { AppDataService } from '../../services/data/app-data.service';

@Component({
  selector: 'kiwi-media-list',
  templateUrl: './kiwi-media-list.component.html',
})
export class KiwiMediaListComponent implements OnInit {

  data$: Promise<Media>;
  uploader: FileUploader;
  resourceKey = 'media';

  @Output() select = new EventEmitter<Media>();

  constructor(private config: ConfigService, private appData: AppDataService) {
  }

  ngOnInit() {
    this.data$ = this.appData.getResourceIndex(this.resourceKey);

    this.uploader = new FileUploader({
      url: this.config.appConfig.routes.mediaUpload,
      removeAfterUpload: true,
      autoUpload: true,
      headers: [
        {
          name: 'X-XSRF-TOKEN',
          value: getDOM().getCookie('XSRF-TOKEN'),
        },
      ],
    });
    this.uploader.onCompleteAll = () => {
      //this.loadData();
    };
  }

  selectMedia(media: Media) {
    this.select.emit(media);
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
}
