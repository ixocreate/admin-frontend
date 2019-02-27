/// <reference types="@types/googlemaps" />
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { GeoPoint } from './map-modal-data.interface';

declare var google: any;

@Component({
  selector: 'ixo-map-modal',
  templateUrl: './ixo-map-modal.component.html',
})
export class IxoMapModalComponent implements OnInit {

  @ViewChild('geoInput') geoInput: ElementRef;
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;

  isValid = true;

  title = 'Select a Location';

  confirmBtnType = 'primary';
  confirmBtnIcon = 'fa fa-check';

  confirmBtnTitle = 'Confirm';
  cancelBtnTitle = 'Cancel';

  geoPoint: GeoPoint = null;

  marker: google.maps.Marker;

  latitude: string | number;
  longitude: string | number;

  onConfirm = (geoPoint: GeoPoint) => {
  };

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.geoInput.nativeElement, {types: ['geocode']});

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.setMarker(true);
      this.geoInput.nativeElement.value = '';
    });

    let center = new google.maps.LatLng(48.210033, 16.363449);

    if (this.geoPoint) {
      this.latitude = this.geoPoint.latitude;
      this.longitude = this.geoPoint.longitude;
      center = new google.maps.LatLng(this.latitude, this.longitude);
    }

    const mapProp = {
      center,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: 'poi',
          stylers: [{visibility: 'off'}],
        },
      ],
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.map.addListener('click', (event) => {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.setMarker();
    });

    if (this.latitude && this.longitude) {
      this.setMarker();
    }
  }

  private hasValidInput() {
    this.isValid = true;
    const latitude: number = parseFloat(this.latitude as any);
    const longitude: number = parseFloat(this.longitude as any);
    if (isNaN(latitude) || isNaN(longitude)) {
      this.isValid = false;
      return false;
    }
    this.latitude = latitude;
    this.longitude = longitude;
    return true;
  }

  setMarker(centerMap: boolean = false) {
    if (this.marker) {
      this.marker.setMap(null);
    }

    if (this.hasValidInput()) {
      const latitude: any = parseFloat(this.latitude as any);
      const longitude: any = parseFloat(this.longitude as any);

      this.geoPoint = {latitude, longitude};

      this.marker = new google.maps.Marker({
        position: {lat: this.geoPoint.latitude, lng: this.geoPoint.longitude},
        map: this.map,
        title: 'Position',
      });

      if (centerMap) {
        this.map.panTo(new google.maps.LatLng(this.geoPoint.latitude, this.geoPoint.longitude));
      }
    } else {
      this.geoPoint = null;
    }
  }

  confirm() {
    this.onConfirm(this.geoPoint);
    this.bsModalRef.hide();
  }
}
