import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

@Component({
  selector: 'formly-field-youtube',
  templateUrl: './formly-field-youtube.component.html'
})
export class FormlyFieldYouTubeComponent extends CustomFieldTypeAbstract implements OnInit {

  isValid = true;
  inputValue: any;
  youtubeUrl = 'https://www.youtube.com/watch?v=';

  ngOnInit() {
    super.ngOnInit();
    if (this.value) {
      this.inputValue = this.youtubeUrl + this.value;
    }
  }

  checkYoutubeLink() {
    this.isValid = true;
    if (this.inputValue === null || this.inputValue === '') {
      return this.setValue(null);
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = this.inputValue.match(regExp);
    if (match && match[2].length === 11) {
      this.setValue(match[2]);
    } else {
      this.isValid = false;
      this.setValue(null);
    }
  }

  setValue(value: any) {
    super.setValue(value);
    if (this.value) {
      this.inputValue = this.youtubeUrl + this.value;
    }
  }

  remove() {
    this.inputValue = '';
    super.remove();
  }

}
