export interface MapModalData {
  confirmBtnTitle?: string;
  confirmBtnType?: string;
  confirmBtnIcon?: string;
  cancelBtnTitle?: string;
  title?: string;
  geoPoint?: GeoPoint;
  onConfirm: (geoPoint: GeoPoint) => void;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}
