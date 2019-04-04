import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ixo-input-modal',
  templateUrl: './ixo-input-modal.component.html',
})
export class IxoInputModalComponent {

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
