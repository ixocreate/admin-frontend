import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from './kiwi-image-cropper.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ImageCropperComponent,
  ],
  exports: [
    ImageCropperComponent,
  ],
})
export class KiwiImageCropperModule {
}
