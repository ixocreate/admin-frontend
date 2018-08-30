import { Injectable } from '@angular/core';

@Injectable()
export class CopyService {

  private copiedBlock: any = null;

  constructor() {
  }

  setCopiedBlock(blockModel: any) {
    this.copiedBlock = blockModel;
  }

  getCopiedBlock(): any {
    return this.copiedBlock;
  }

}
