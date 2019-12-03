import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { ConfigService } from '../../services/config.service';
import { Media } from '../../interfaces/media.interface';
import { AppDataService } from '../../services/data/app-data.service';
import { MediaHelper } from '../../helpers/media.helper';
import { Router } from '@angular/router';
import { ImageHelper } from '../../helpers/image.helper';

@Component({
  selector: 'ixo-media-list',
  templateUrl: './ixo-media-list.component.html',
})
export class IxoMediaListComponent implements OnInit {

  data$: Promise<Media>;
  uploader: FileUploader;
  @Input() filterValue = '';
  itemsPerPage = 18;
  @Input() currentPage = 1;
  totalItems = 0;
  renderPagination = false;

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

  @Output() selectedMedia = new EventEmitter<Media>();
  @Output() changeFilters = new EventEmitter<{
    search: string,
    mediaType: string,
    page: number,
  }>();

  isImage = MediaHelper.isImage;
  isSVG = MediaHelper.isSVG;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  constructor(private config: ConfigService, private appData: AppDataService, private router: Router) {
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
      this.renderPagination = false;
      setTimeout(() => {
        this.renderPagination = true;
      });
      return response;
    });
  }

  selectMedia(media: Media) {
    this.selectedMedia.emit(media);
  }

  openDetail(media: Media) {
    window.open(window.location.href.split('#')[0] + '#/media/' + media.id + '/edit', '_blank');
  }

  openImage(media: Media) {
    ImageHelper.setImage(media.original);
  }

  applyFilter() {
    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.updateMedia();
      this.emitChangeFilter();
    }, 500);
  }

  emitChangeFilter() {
    this.changeFilters.emit({
      page: this.currentPage,
      search: this.filterValue,
      mediaType: this.selectedType,
    });
  }

  onPage(event) {
    if (this.currentPage !== event.page) {
      this.currentPage = event.page;
      this.updateMedia();
      this.emitChangeFilter();
    }
  }

  onChangeType() {
    this.currentPage = 1;
    this.updateMedia();
    this.emitChangeFilter();
  }

}
