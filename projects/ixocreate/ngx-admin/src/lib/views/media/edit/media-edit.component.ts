import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { IxoConfirmModalComponent } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { ConfirmModalData } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component.model';
import { ConfigService } from '../../../services/config.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CropperPosition, IxoImageCropperComponent } from '../../../components/ixo-image-cropper/ixo-image-cropper.component';
import { Entity } from './media-edit.component.model';

@Component({
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.scss'],
})
export class MediaEditComponent extends ViewAbstractComponent implements OnInit {

  @ViewChild(IxoImageCropperComponent) cropper: IxoImageCropperComponent;

  data$: Promise<any>;

  id: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  image;

  maintainAspectRatio: boolean;
  aspectRatio: number;
  minWidth: number;
  minHeight: number;

  activeEntity: Entity;
  entities: Entity[] = [];

  loading = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected modal: BsModalService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (this.id === 'undefined') {
        this.router.navigateByUrl('/media').catch(() => null);
        return;
      }
      this.data$ = this.appData.getMediaDetail(this.id).then((response: any) => {
        if (response.isCropable) {
          this.image = response.media.original;
          this.entities = [];
          for (const media of this.config.config.media) {
            const definition = this.getDefinitionByName(response.definitions, media.name);
            if (definition) {
              this.entities.push({
                name: media.name,
                label: media.label,
                width: media.width,
                height: media.height,
                crop: definition.cropParameter,
                unsaved: false,
                isCropable: definition.isCropable,
              });
            }
          }
          setTimeout(() => {
            for (const entity of this.entities) {
              if (entity.isCropable) {
                this.setActiveEntity(entity);
                break;
              }
            }
          });
        }
        return response;
      });
    });
  }

  setActiveEntity(entity: Entity) {
    this.activeEntity = entity;
    this.minWidth = entity.width;
    this.minHeight = entity.height;
    if (entity.width && entity.height) {
      this.maintainAspectRatio = true;
      this.aspectRatio = entity.width / entity.height;
    } else {
      this.maintainAspectRatio = false;
    }
    this.cropper.setCropperPosition(entity.unsavedCrop || entity.crop);
  }

  saveCrop(entity: Entity) {
    this.loading = true;
    this.appData.mediaEditor(this.id, entity.name, entity.unsavedCrop).then(() => {
      this.loading = false;
      entity.crop = entity.unsavedCrop;
      this.checkUnsavedStatus(entity);
    }).catch(() => this.loading = false);
  }

  resetCrop(entity: Entity) {
    this.cropper.setCropperPosition(entity.crop);
    this.checkUnsavedStatus(entity);
  }

  onCrop(data: CropperPosition) {
    this.activeEntity.unsavedCrop = data;
    this.checkUnsavedStatus(this.activeEntity);
  }

  onSubmit() {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    }
  }

  doDelete() {
    const initialState: ConfirmModalData = {
      title: 'Delete this Media?',
      text: 'Do you really want to delete this Media?',
      onConfirm: () => {
        this.appData.mediaDelete(this.id).then(() => {
          this.notification.success('Media successfully deleted', 'Success');
          this.router.navigateByUrl('/media');
        }).catch((error) => this.notification.apiError(error));
      },
    };
    this.modal.show(IxoConfirmModalComponent, {initialState});
  }

  private isSameCropPosition(crop1: CropperPosition, crop2: CropperPosition): boolean {
    return !(crop1.x1 !== crop2.x1 || crop1.x2 !== crop2.x2 || crop1.y1 !== crop2.y1 || crop1.y2 !== crop2.y2);
  }

  private checkUnsavedStatus(entity: Entity) {
    if (entity.unsavedCrop) {
      this.activeEntity.unsaved = !this.isSameCropPosition(entity.crop, entity.unsavedCrop);
    } else {
      this.activeEntity.unsaved = false;
    }
  }

  private getDefinitionByName(definitions, name): { cropParameter: CropperPosition, isCropable: boolean, name: string } {
    for (const definition of definitions) {
      if (name === definition.name) {
        return definition;
      }
    }
    return null;
  }

}
