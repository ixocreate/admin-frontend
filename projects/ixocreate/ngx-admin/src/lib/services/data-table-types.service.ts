import { Injectable } from '@angular/core';
import { IxoDatePipe } from '../pipes/ixo-date.pipe';
import { IxoDateTimePipe } from '../pipes/ixo-date-time.pipe';
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

@Injectable({
  providedIn: 'root'
})
export class DataTableTypesService {
  private types: { [type: string]: (options: any) => DataTableTypesOptions } = {};

  constructor(ixoDate: IxoDatePipe, ixoDateTime: IxoDateTimePipe) {
    this.registerType('string', () => ({
      render: (value: any) => value,
    }));

    this.registerType('date', () => ({
      // align: 'right',
      render: (value: any) => '<span class="date">' + ixoDate.transform(value) + '</span>',
    }));

    this.registerType('datetime', () => ({
      // align: 'right',
      render: (value: any) => '<span class="date">' + ixoDateTime.transform(value) + '</span>',
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

    this.registerType('select', (options) => {
      const valueOptions = [];
      for (const key of Object.keys(options.values)) {
        valueOptions.push({value: key, name: options.values[key]});
      }
      return {
        searchElement: {
          type: 'select',
          options: valueOptions,
        },
        render: (value: any) => `${options.values[value]}`,
      };
    });

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
