import {Component, forwardRef, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Link} from '../../../models';

@Component({
    selector: 'link-selector',
    templateUrl: './link-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LinkSelectorComponent),
            multi: true
        }
    ]
})
export class LinkSelectorComponent implements ControlValueAccessor {

  link: Link;
  modalRef: BsModalRef;
  onChange = (link: Link) => {
  };
  onTouched = () => {
  };

  constructor(
    private modalService: BsModalService
  ) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(link: Link): void {
    this.link = link;
    this.onChange(this.link);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-lg'
    });
  }

  remove() {
    this.writeValue(null);
  }

  onSelect(link: Link) {
    this.modalRef.hide();
    this.writeValue(link);
  }
}
