import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { ConfigService } from '../../services/config.service';
import { Media } from '../../interfaces/media.interface';
import { AppDataService } from '../../services/data/app-data.service';
import { MediaHelper } from '../../helpers/media.helper';

@Component({
  selector: 'kiwi-media-list',
  templateUrl: './kiwi-media-list.component.html',
})
export class KiwiMediaListComponent implements OnInit {

  data$: Promise<Media>;
  uploader: FileUploader;
  filterValue = '';
  itemsPerPage = 18;
  currentPage = 1;
  totalItems = 0;

  types = [
    {
      name: '',
      label: 'All',
    },
    {
      name: 'image',
      label: 'Images',
    },
    {
      name: 'document',
      label: 'Documents',
    },
    {
      name: 'video',
      label: 'Video files',
    },
    {
      name: 'audio',
      label: 'Audio files',
    },
  ];

  @Input() selectedType = '';
  @Input() showTypeFilter = true;

  private inputTimeout = null;

  @Output() select = new EventEmitter<Media>();

  isImage = MediaHelper.isImage;
  isSVG = MediaHelper.isSVG;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  constructor(private config: ConfigService, private appData: AppDataService) {
  }

  ngOnInit() {
    this.updateMedia();

    this.uploader = new FileUploader({
      url: this.config.config.routes.mediaUpload,
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
      this.updateMedia();
    };
  }

  updateMedia() {
    this.data$ = this.appData.getMediaIndex(this.itemsPerPage, this.currentPage, this.filterValue, this.selectedType).then((response: any) => {
      this.totalItems = response.count;
      return response;
    });
  }

  selectMedia(media: Media) {
    this.select.emit(media);
  }

  applyFilter() {
    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.updateMedia();
    }, 500);
  }

  onPage(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.updateMedia();
    }
  }

  onChangeType() {
    this.currentPage = 1;
    this.updateMedia();
  }

}
