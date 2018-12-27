import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { GeoPoint, MapModalData } from '../../modals/kiwi-map-modal/map-modal-data.interface';
import { BsModalService } from 'ngx-bootstrap';
import { KiwiMapModalComponent } from '../../modals/kiwi-map-modal/kiwi-map-modal.component';

declare var ol: any;

@Component({
  selector: 'formly-field-geo-point',
  template: `
    <div class="input-group" (click)="openMapModal()" [class.cursor-pointer]="!to.disabled">
      <div class="input-group-prepend">
        <span class="input-group-text" [class.is-invalid]="showError"><i class="fa fa-fw fa-map-marker"></i></span>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="locationString" [placeholder]="to.placeholder"
             [class.is-invalid]="showError" [disabled]="to.disabled">
      <div class="input-group-append" *ngIf="!to.required && !to.disabled">
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError">
          <i class="fa fa-map"></i>
        </button>
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()"
                kiwiClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
  `,
})
export class FormlyFieldGeoPointComponent extends CustomFieldTypeAbstract implements OnInit {

  locationString: string;

  constructor(public modal: BsModalService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.parseLocationString();
  }

  parseLocationString() {
    const geoPoint: GeoPoint = this.value;
    if (geoPoint) {
      this.locationString = geoPoint.latitude + ' / ' + geoPoint.longitude;
    } else {
      this.locationString = '';
    }
  }

  remove() {
    super.remove();
    this.parseLocationString();
  }

  openMapModal() {
    if (this.to.disabled) {
      return;
    }
    const initialState: MapModalData = {
      onConfirm: (geoPoint) => {
        this.setValue(geoPoint);
        this.parseLocationString();
      },
    };
    if (this.value) {
      initialState.geoPoint = this.value;
    }
    this.modal.show(KiwiMapModalComponent, {initialState});
  }

}
