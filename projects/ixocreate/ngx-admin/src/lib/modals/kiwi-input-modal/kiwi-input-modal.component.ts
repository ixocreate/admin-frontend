import { Component, } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'kiwi-input-modal',
  templateUrl: './kiwi-input-modal.component.html',
})
export class KiwiInputModalComponent {

  title = '';
  text = '';

  confirmBtnType = 'primary';
  confirmBtnIcon = 'fa fa-check';

  confirmBtnTitle = 'Accept';
  cancelBtnTitle = 'Cancel';

  value = '';

  onConfirm = (value) => {
  };

  constructor(public bsModalRef: BsModalRef) {
  }

  confirm() {
    this.onConfirm(this.value);
    this.bsModalRef.hide();
  }
}
