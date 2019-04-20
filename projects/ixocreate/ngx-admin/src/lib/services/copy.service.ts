import { Injectable } from '@angular/core';
import { IxoConfirmModalComponent } from '../modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { ConfirmModalData } from '../modals/ixo-confirm-modal/confirm-modal-data.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from './local-storage.service';
import { IxoInputModalComponent } from '../modals/ixo-input-modal/ixo-input-modal.component';
import { InputModalData } from '../modals/ixo-input-modal/input-modal-data.interface';
import { Page } from '../interfaces/page.interface';

export interface BlockCopy {
  id: string;
  name: string;
  model: any;
}

@Injectable()
export class CopyService {

  private readonly COPIED_BLOCKS_STORAGE_KEY = 'copiedBlocks';

  private copiedPage: Page;

  moveType: string;

  constructor(private modal: BsModalService, private localStorage: LocalStorageService) {
  }

  private getRandomString(): string {
    return Math.random().toString(36).substring(3);
  }

  setCopyPage(page: Page, type: string) {
    this.moveType = type;
    this.copiedPage = page;
  }

  get copyPage(): Page {
    return this.copiedPage;
  }

  addCopiedBlock(model: any): Promise<boolean> {
    return new Promise((resolve) => {
      const initialState: InputModalData = {
        title: 'Enter a name for this copy',
        text: 'Enter a name which will identify your copy:',
        onConfirm: (name) => {
          const copiedBlocks = this.copiedBlocks;
          const id = this.getRandomString();
          copiedBlocks.push({id, name, model});
          this.localStorage.setItem(this.COPIED_BLOCKS_STORAGE_KEY, copiedBlocks);
        },
      };
      this.modal.show(IxoInputModalComponent, {initialState});
      const sub = this.modal.onHidden.subscribe(() => {
        resolve(true);
      });
    });
  }

  get copiedBlocks(): BlockCopy[] {
    return this.localStorage.getItem(this.COPIED_BLOCKS_STORAGE_KEY, []);
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
      const sub = this.modal.onHidden.subscribe(() => {
        resolve(true);
      });
    });
  }

}
