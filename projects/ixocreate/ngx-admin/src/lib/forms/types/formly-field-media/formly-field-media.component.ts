import { Component, TemplateRef } from '@angular/core';
import { MediaHelper } from '../../../helpers/media.helper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { AnnotatedMedia } from './formly-field-media.component.model';

@Component({
  selector: 'formly-field-media',
  templateUrl: './formly-field-media.component.html',
  styleUrls: ['./formly-field-media.component.scss']
})
export class FormlyFieldMediaComponent extends CustomFieldTypeAbstract {

  /**
   * selected image to be annotated
   */
  value: AnnotatedMedia;
  modalRef: BsModalRef;

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  posx: number;
  posy: number;

  constructor(protected modalService: BsModalService) {
    super();
  }

  openModal(template: TemplateRef<any>) {
    console.log(this.value);
    if (this.to.disabled) {
      return;
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-lg modal-empty'});
  }

  onSelect(value: any) {
    this.modalRef.hide();
    super.setValue(value);
  }

  close() {
    this.modalRef.hide();
  }

  annotate(event) {
    const i = parseInt(document.getElementById('span-id').innerHTML);

    const image = document.getElementById('pointer_div');
    const tag = document.getElementById('tagged');

    this.posx = event.offsetX ? (event.offsetX) : event.pageX - image.offsetLeft;
    this.posy = event.offsetY ? (event.offsetY) : event.pageY - image.offsetTop;

    tag.style.left = (this.posx - 13) + 'px';
    tag.style.top = (this.posy - 13) + 'px';
    tag.style.visibility = 'visible';

    document.getElementById('span-id').innerHTML = i + 1 + '';

    if (!this.value.points) {
      this.value.points = [];
    }

    this.value.points.push({
      x: this.posx,
      y: this.posy,
      title: 'test',
      body: 'string',
    });

    console.log(this.posx);
    console.log(this.posy);
  }
}
