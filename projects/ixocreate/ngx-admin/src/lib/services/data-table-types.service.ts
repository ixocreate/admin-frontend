import { Injectable } from '@angular/core';
import { KiwiDatePipe } from '../pipes/kiwi-date.pipe';
import { KiwiDateTimePipe } from '../pipes/kiwi-date-time.pipe';
import { MediaHelper } from '../helpers/media.helper';
import { Media } from '../interfaces/media.interface';

export interface DataTableTypesSearchElement {
  type: 'input' | 'select';
  options?: Array<{ value: string, name: string }>;
}

export interface DataTableTypesOptions {
  width?: number;
  align?: 'left' | 'center' | 'right';
  searchElement?: DataTableTypesSearchElement;
  render: ((value: any) => string);
}

@Injectable()
export class DataTableTypesService {
  private types: { [type: string]: (options: any) => DataTableTypesOptions } = {};

  constructor(kiwiDate: KiwiDatePipe, kiwiDateTime: KiwiDateTimePipe) {
    this.registerType('string', () => ({
      render: (value: any) => value,
    }));

    this.registerType('date', () => ({
      align: 'right',
      render: (value: any) => '<i>' + kiwiDate.transform(value) + '</i>',
    }));

    this.registerType('datetime', () => ({
      align: 'right',
      render: (value: any) => '<i>' + kiwiDateTime.transform(value) + '</i>',
    }));

    this.registerType('bool', (options) => ({
      align: 'center',
      searchElement: {
        type: 'select',
        options: [
          {value: '1', name: options.values['true'] || 'yes'},
          {value: '0', name: options.values['false'] || 'no'},
        ],
      },
      render: (value: any) => {
        const key = value ? 'true' : 'false';
        let color = value ? 'success' : 'danger';
        let text = value ? 'yes' : 'no';
        if (options.colors) {
          color = options.colors[key];
        }
        if (options.values) {
          text = options.values[key];
        }
        return `<span class="badge badge-${color}">${text}</span>`;
      },
    }));

    this.registerType('media', () => ({
      render: (media: Media) => {
        if (!media) {
          return `
            <div class="table-media-icon">
              <span class="file-icon fa fa-4x fa-fw fa-ban"></span>
            </div>
          `;
        }
        if (MediaHelper.isImage(media.mimeType)) {
          return `
            <span class="transparent-img-bg border-radius"><a href="${media.original}" target="_blank">
              <img class="table-img" alt="" src="${media.thumb}"></a>
            </span>
          `;
        } else {
          return `
            <div class="table-media-icon">
              <span class="file-icon fa fa-4x fa-fw ${MediaHelper.mimeTypeIcon(media.mimeType)}"></span>
            </div>
          `;
        }
      },
    }));
  }

  registerType(key: string, options: (options: any) => DataTableTypesOptions) {
    this.types[key] = options;
  }

  getType(key: string) {
    if (!this.types[key]) {
      return null;
    }
    return this.types[key];
  }
}
