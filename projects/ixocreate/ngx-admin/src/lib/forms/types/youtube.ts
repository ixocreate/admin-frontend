import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-youtube',
  template: `
    <div class="input-group" [class.has-error]="showError || !isValid">
      <div class="input-group-prepend">
        <span class="input-group-text p-0" [class.is-invalid]="showError">
          <div class="input-youtube-preview" *ngIf="!value"><i class="fa fa-fw fa-video-camera"></i></div>
          <a [href]="youtubeUrl + value" target="_blank" class="input-youtube-preview" *ngIf="value"
             [style.backgroundImage]="'url(https://img.youtube.com/vi/' + value + '/sddefault.jpg)'" ixoClickStopPropagation></a>
        </span>
      </div>
      <input type="text" class="form-control" [(ngModel)]="inputValue" (keyup)="checkYoutubeLink()" [placeholder]="to.placeholder"
             [class.is-invalid]="showError || !isValid" [disabled]="to.disabled">
      <div class="input-group-append" *ngIf="!to.required && !to.disabled">
        <button type="button" class="btn" [class.btn-outline-input]="!showError && isValid"
                [class.btn-outline-danger]="showError || !isValid" (click)="remove()">
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
    <div class="invalid-feedback d-block" *ngIf="!isValid && !showError">Not a valid Youtube-URL</div>
  `,
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
