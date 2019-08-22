import { Injectable } from '@angular/core';
import { IxoConfirmModalComponent } from '../modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { ConfirmModalData } from '../modals/ixo-confirm-modal/ixo-confirm-modal.component.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from './local-storage.service';
import { IxoInputModalComponent } from '../modals/ixo-input-modal/ixo-input-modal.component';
import { InputModalData } from '../modals/ixo-input-modal/ixo-input-modal.component.model';
import { Page } from '../interfaces/page.interface';
import { v4 as uuid } from 'uuid';

export interface BlockCopy {
  id: string;
  name: string;
  model: any;
}

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  moveType: string;
  private readonly COPIED_BLOCKS_STORAGE_KEY = 'copiedBlocks';
  private copiedPage: Page;

  constructor(private modal: BsModalService, private localStorage: LocalStorageService) {
  }

  get copyPage(): Page {
    return this.copiedPage;
  }

  get copiedBlocks(): BlockCopy[] {
    return this.localStorage.getItem(this.COPIED_BLOCKS_STORAGE_KEY, []);
  }

  setCopyPage(page: Page, type: string) {
    this.moveType = type;
    this.copiedPage = page;
  }

  addCopiedBlock(model: any): Promise<boolean> {
    return new Promise((resolve) => {
      const initialState: InputModalData = {
        title: 'Enter a name for this copy',
        text: 'Enter a name which will identify your copy:',
        onConfirm: (name) => {
          const copiedBlocks = this.copiedBlocks;
          copiedBlocks.push({id: uuid(), name, model});
          this.localStorage.setItem(this.COPIED_BLOCKS_STORAGE_KEY, copiedBlocks);
        },
      };
      this.modal.show(IxoInputModalComponent, {initialState});
      this.modal.onHidden.subscribe(() => {
        resolve(true);
      });
    });
  }

  removeCopiedBlock(copiedBlock: BlockCopy) {
    return new Promise((resolve) => {
      const initialState: ConfirmModalData = {
        title: 'Delete this copied block?',
        text: 'Do you really want to delete this copied block?',
        onConfirm: () => {
          let copiedBlocks = this.copiedBlocks;
          copiedBlocks = copiedBlocks.filter((data) => {
            return data.id !== copiedBlock.id;
          });
          this.localStorage.setItem(this.COPIED_BLOCKS_STORAGE_KEY, copiedBlocks);
        },
      };
      this.modal.show(IxoConfirmModalComponent, {initialState});
      this.modal.onHidden.subscribe(() => {
        resolve(true);
      });
    });
  }

}
