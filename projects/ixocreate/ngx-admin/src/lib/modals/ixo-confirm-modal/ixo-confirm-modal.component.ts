import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ixo-confirm-modal',
  templateUrl: './ixo-confirm-modal.component.html',
})
export class IxoConfirmModalComponent {

  title = '';
  text = '';

  confirmBtnType = 'danger';
  confirmBtnIcon = 'fa fa-trash';

  confirmBtnTitle = 'Delete';
  cancelBtnTitle = 'Cancel';

  onConfirm = () => {
  };

  constructor(public bsModalRef: BsModalRef) {
  }

  confirm() {
    this.onConfirm();
    this.bsModalRef.hide();
  }
}
