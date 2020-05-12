import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { LinkSelectModalData } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component.model';
import { IxoLinkSelectModalComponent } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

interface ColType {
  text: string;
  heading: boolean;
  link: {
    target: string
    type: string
    value: string
  };
}

@Component({
  selector: 'formly-field-quill',
  templateUrl: './formly-field-table.component.html',
})
export class FormlyFieldTableComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  colums = 3;

  columData = [
    {value: 1, label: '1 Colum'},
    {value: 2, label: '2 Colums'},
    {value: 3, label: '3 Colums'},
    {value: 4, label: '4 Colums'},
    {value: 5, label: '5 Colums'},
    {value: 6, label: '6 Colums'},
    {value: 7, label: '7 Colums'},
    {value: 8, label: '8 Colums'},
    {value: 9, label: '9 Colums'},
  ];

  tableData: ColType[][] = [];

  constructor(private element: ElementRef, private modalService: BsModalService) {
    super();
  }

  ngOnInit() {
    console.log(this.formControl.value);
    if (this.tableData[0]) {
      this.colums = this.tableData[0].length;
    }

    if (false) {
      this.tableData = [
        [
          {
            text: 'Heading 1',
            heading: true,
            link: {
              type: 'external',
              target: '_self',
              value: 'fdsafdsa',
            },
          },
          {
            text: 'Heading 2',
            heading: true,
            link: null,
          },
          {
            text: 'Heading 3',
            heading: true,
            link: null,
          },
        ],
        [
          {
            text: 'Col 1',
            heading: false,
            link: null,
          },
          {
            text: 'Col 2',
            heading: false,
            link: null,
          },
          {
            text: 'Col 3',
            heading: false,
            link: null,
          },
        ],
      ];
    }

    // this.tableData = { ...this.formControl.value };
  }

  onChangeCols(cols: string) {
    const newCols = parseInt(cols, 10);
    const newData = [];
    for (const data of this.tableData) {
      const newRow = [];
      for (let i = 0; i < newCols; i++) {
        if (data[i]) {
          newRow.push(data[i]);
        } else {
          newRow.push({text: '', heading: false, link: null});
        }
      }
      newData.push(newRow);
    }
    this.tableData = newData;
  }

  addRow() {
    const newRow = [];
    for (let i = 0; i < this.colums; i++) {
      newRow.push({text: '', heading: false, link: null});
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

  onContentChanged() {
    this.formControl.markAsTouched();
    if (!!this.tableData.length) {
      this.setValue(this.tableData);
    } else {
      this.setValue(null);
    }
  }

}
