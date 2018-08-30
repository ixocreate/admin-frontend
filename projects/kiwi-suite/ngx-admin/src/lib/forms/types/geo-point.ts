import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
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

declare var ol: any;

@Component({
  selector: 'formly-field-geo-point',
  template: `
    <div class="input-map-wrapper" [class.is-invalid]="showError || !isValid">
      <div class="pt-2 px-2">
        <div class="form-group">
          <label class="kiwi-form-label">Latitude</label>
          <div class="kiwi-form-control-container">
            <input [(ngModel)]="latitude" class="form-control" (change)="setMarker()" [class.is-invalid]="showError || !isValid"/>
          </div>
        </div>
        <div class="form-group">
          <label class="kiwi-form-label">Longitude</label>
          <div class="kiwi-form-control-container">
            <input [(ngModel)]="longitude" class="form-control" (change)="setMarker()" [class.is-invalid]="showError || !isValid">
          </div>
        </div>
      </div>
      <div id="map" class="map"></div>
    </div>
  `,
})
export class FormlyFieldGeoPointComponent extends CustomFieldTypeAbstract implements OnInit {

  isValid = true;

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

  ngOnInit() {
    super.ngOnInit();

    let center = fromLonLat([16.363449, 48.210033]);
    if (this.value) {
      this.latitude = this.value.lat;
      this.longitude = this.value.lng;
      center = fromLonLat([this.longitude, this.latitude]);
    }

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({preload: 4, source: new OSM()}),
        new VectorLayer({
          source: this.markerSource,
          style: this.markerStyle,
        }),
      ],
      view: new View({
        center: center,
        zoom: 9,
      }),
    });

    map.on('singleclick', (event) => {
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
  }

  setMarker() {
    const lat: any = parseFloat(<any>this.latitude);
    const lng: any = parseFloat(<any>this.longitude);

    this.setValue({lat, lng});

    this.markerSource.clear();

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
      name: 'Position',
    });

    this.markerSource.addFeature(iconFeature);
  }

}
