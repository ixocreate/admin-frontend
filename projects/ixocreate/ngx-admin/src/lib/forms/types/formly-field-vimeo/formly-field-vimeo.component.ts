import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'formly-field-vimeo',
  templateUrl: './formly-field-vimeo.component.html'
})
export class FormlyFieldVimeoComponent extends CustomFieldTypeAbstract implements OnInit {

  isValid = true;
  inputValue: any;
  vimeoUrl = 'https://vimeo.com/';
  thumbnail: string | null = null;

  constructor(protected http: HttpClient) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.value) {
      this.inputValue = this.vimeoUrl + this.value;
      this.updateThumbnail();
    }
  }

  updateThumbnail() {
    this.http.get(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(this.inputValue)}`).subscribe((data: any) => {
      this.thumbnail = data.thumbnail_url;
    });
  }

  checkYoutubeLink() {
    this.isValid = true;
    if (this.inputValue === null || this.inputValue === '') {
      return this.setValue(null);
    }
    const regExp = /^.*(vimeo.com\/)(?:video\/)?(\d+).*/;
    const match = this.inputValue.match(regExp);
    if (match) {
      this.setValue(match[2]);
    } else {
      this.isValid = false;
      this.setValue(null);
    }
  }

  setValue(value: any) {
    super.setValue(value);
    if (this.value) {
      this.inputValue = this.vimeoUrl + this.value;
      this.updateThumbnail();
    }
  }

  remove() {
    this.inputValue = '';
    this.thumbnail = null;
    super.remove();
  }

}
