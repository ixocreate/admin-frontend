import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { LinkSelectModalData } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component.model';
import { IxoLinkSelectModalComponent } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IxoWysiwigModalComponent } from '../../../modals/ixo-wysiwig-modal/ixo-wysiwig-modal.component';
import { QuillData, WysiwigModalData } from '../../../modals/ixo-wysiwig-modal/ixo-wysiwig-modal.component.model';

interface ColType {
  text: string;
  heading: boolean;
  quill: QuillData;
  link: {
    target: string
    type: string
    value: string
  };
}

@Component({
  selector: 'formly-field-table',
  templateUrl: './formly-field-table.component.html',
})
export class FormlyFieldTableComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  header: string[] | null = null;

  minCols = 1;
  maxCols = 9;
  minRows = null;
  maxRows = null;
  colums = 3;

  columData = [];

  tableData: ColType[][] = [];

  constructor(private element: ElementRef, private modalService: BsModalService) {
    super();
  }

  setColsSelect(min: number, max: number) {
    this.minCols = min;
    this.maxCols = max;
    const temp: any[] = [];
    for (let i = min; i <= max; i++) {
      temp.push({value: i, label: `${i} ${i === 1 ? 'Colum' : 'Colums'}`});
    }
    if (this.colums < min) {
      this.onChangeCols(min);
    }
    if (this.colums > max) {
      this.onChangeCols(max);
    }
    this.columData = temp;
  }

  ngOnInit() {
    this.minRows = this.to.minRows || this.minRows;
    this.maxRows = this.to.maxRows || this.maxRows;

    if (this.to.header && !!this.to.header.length) {
      this.header = this.to.header;
    }

    if (this.formControl.value) {
      this.tableData = [...this.formControl.value];
    }

    if (this.tableData[0]) {
      this.colums = this.tableData[0].length;
    }

    if (this.tableData.length < this.minRows) {
      this.onChangeRows(this.minRows);
    }

    this.setColsSelect(this.to.minCols || this.minCols, this.to.maxCols || this.maxCols);
    this.setHeader();
  }

  setHeader() {
    if (this.to.header) {
      const newHeader = [];
      for (let i = 0; i < this.colums; i++) {
        newHeader.push(this.to.header[i] || '');
      }
      this.header = newHeader;
    }
  }

  onChangeCols(cols: string | number) {
    const newCols = parseInt(cols.toString(), 10);
    this.colums = newCols;
    const newData = [];
    for (const data of this.tableData) {
      const newRow = [];
      for (let i = 0; i < newCols; i++) {
        if (data[i]) {
          newRow.push(data[i]);
        } else {
          newRow.push({text: '', heading: false, link: null, quill: null});
        }
      }
      newData.push(newRow);
    }
    this.setHeader();
    this.tableData = newData;
    this.onContentChanged();
  }

  onChangeRows(rows: number) {
    const newData = [];
    for (let i = 0; i < rows; i++) {
      if (this.tableData[i]) {
        newData.push(this.tableData[i]);
      } else {
        const newRow = [];
        for (let j = 0; j < this.colums; j++) {
          newRow.push({text: '', heading: false, link: null, quill: null});
        }
        newData.push(newRow);
      }
    }
    this.tableData = newData;
    this.onContentChanged();
  }

  addRow() {
    const newRow = [];
    for (let i = 0; i < this.colums; i++) {
      newRow.push({text: '', heading: false, link: null, quill: null});
    }
    this.tableData.push(newRow);
    this.onContentChanged();
  }

  removeRow(index: number) {
    this.tableData.splice(index, 1);
    this.onContentChanged();
  }

  onChange(value: string) {
    this.onContentChanged();
  }

  onChangeColHeading(col: ColType) {
    col.heading = !col.heading;
    this.onContentChanged();
  }

  openLinkModal(col: ColType) {
    const initialState: LinkSelectModalData = {
      value: col.link,
      onConfirm: (data) => {
        col.link = data;
        this.onContentChanged();
      },
    };
    this.modalService.show(IxoLinkSelectModalComponent, {class: 'modal-lg', initialState});
  }

  openWysiwig(col: ColType) {
    const initialState: WysiwigModalData = {
      value: col.quill,
      onConfirm: (data) => {
        col.text = '';
        col.quill = data;
        this.onContentChanged();
      },
    };
    this.modalService.show(IxoWysiwigModalComponent, {class: 'modal-lg', initialState});
  }

  onContentChanged() {
    this.formControl.markAsTouched();
    if (!!this.tableData.length) {
      this.setValue(this.tableData);
    } else {
      this.setValue(null);
    }
  }

}
