import { CropperPosition } from '../../../components/ixo-image-cropper/ixo-image-cropper.component';

export interface Entity {
  name: string;
  label: string;
  width: number;
  height: number;
  crop: CropperPosition;
  unsavedCrop?: CropperPosition;
  unsaved: boolean;
  isCropable: boolean;
}
