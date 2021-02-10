import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

@Component({
  selector: 'formly-field-textarea',
  templateUrl: './formly-field-textarea.component.html',
  styleUrls: ['./formly-field-textarea.component.scss'],
})
export class FormlyFieldTextareaComponent extends CustomFieldTypeAbstract implements OnInit {
  public characterCount = false;
  public minCharCount = null;
  public maxCharCount = null;

  ngOnInit() {
    super.ngOnInit();
    this.characterCount = this.to.characterCount;
    if (this.to.characterBoundaries) {
      this.minCharCount = this.to.characterBoundaries.min;
      this.maxCharCount = this.to.characterBoundaries.max;
    }
  }

  valueLength() {
    if (this.value) {
      return this.value.length;
    }
    return 0;
  }

  onChange(event: any) {
    this.onSelect(event.target.value);
  }
}
