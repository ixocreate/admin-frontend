import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GeoPoint } from './map-modal-data.interface';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Vector from 'ol/source/Vector';
import OSM from 'ol/source/OSM.js';
import { Icon, Style } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj.js';

declare var google: any;

@Component({
  selector: 'kiwi-map-modal',
  templateUrl: './kiwi-map-modal.component.html',
})
export class KiwiMapModalComponent implements OnInit {

  @ViewChild('geoInput') geoInput: ElementRef;

  isValid = true;

  title = 'Select a Location';

  confirmBtnType = 'primary';
  confirmBtnIcon = 'fa fa-check';

  confirmBtnTitle = 'Confirm';
  cancelBtnTitle = 'Cancel';

  geoPoint: GeoPoint = null;

  map: any;

  latitude: string | number;
  longitude: string | number;

  private markerSource = new Vector();
  private markerStyle = new Style({
    image: new Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 1,
      src: '/assets/img/map-pin.png',
    })),
  });

  onConfirm = (geoPoint: GeoPoint) => {
  };

  constructor(public bsModalRef: BsModalRef,
              private modal: BsModalService) {
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


    const sub = this.modal.onShown.subscribe(() => {
      sub.unsubscribe();
      let center = fromLonLat([16.363449, 48.210033]);

      if (this.geoPoint) {
        this.latitude = this.geoPoint.latitude;
        this.longitude = this.geoPoint.longitude;
        center = fromLonLat([this.longitude, this.latitude]);
      }

      this.map = new Map({
        target: 'modal_map',
        layers: [
          new TileLayer({preload: 4, source: new OSM()}),
          new VectorLayer({
            source: this.markerSource,
            style: this.markerStyle,
          }),
        ],
        view: new View({
          center: center,
          zoom: 10,
        }),
      });

      this.map.on('singleclick', (event) => {
        const lonLat = toLonLat(event.coordinate);
        this.longitude = lonLat[0];
        this.latitude = lonLat[1];
        this.setMarker();
      });

      setTimeout(() => {
        if (this.latitude && this.longitude) {
          this.setMarker();
        }
      });
    });
  }

  private hasValidInput() {
    this.isValid = true;
    const latitude: number = parseFloat(<any>this.latitude);
    const longitude: number = parseFloat(<any>this.longitude);
    if (isNaN(latitude) || isNaN(longitude)) {
      this.isValid = false;
      return false;
    }
    this.latitude = latitude;
    this.longitude = longitude;
    return true;
  }

  setMarker(centerMap: boolean = false) {
    this.markerSource.clear();

    if (this.hasValidInput()) {
      const latitude: any = parseFloat(<any>this.latitude);
      const longitude: any = parseFloat(<any>this.longitude);

      this.geoPoint = {latitude, longitude};
      this.markerSource.addFeature(new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
        name: 'Position',
      }));

      if (centerMap) {
        this.map.getView().setCenter(fromLonLat([longitude, latitude]));
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
