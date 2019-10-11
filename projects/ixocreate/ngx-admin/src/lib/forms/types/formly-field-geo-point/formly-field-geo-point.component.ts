import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { GeoPoint, MapModalData } from '../../../modals/ixo-map-modal/ixo-map-modal.component.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IxoMapModalComponent } from '../../../modals/ixo-map-modal/ixo-map-modal.component';

@Component({
  selector: 'formly-field-geo-point',
  templateUrl: './formly-field-geo-point.component.html'
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
      this.locationString = geoPoint.lat + ' / ' + geoPoint.lng;
    } else {
      this.locationString = '';
    }
  }

  remove() {
    super.remove();
    this.parseLocationString();
  }

  setValue(value: any) {
    super.setValue(value);
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
    this.modal.show(IxoMapModalComponent, {initialState});
  }

}
