import { Component, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormHelper } from '../../../helpers/form.helper';
import { MediaHelper } from '../../../helpers/media.helper';
import { AnnotatedMedia, Media } from '../../../interfaces/media.interface';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { ImageHelper } from '../../../helpers/image.helper';

@Component({
  selector: 'formly-field-media-annotated',
  templateUrl: './formly-field-media-annotated.component.html',
  styleUrls: ['./formly-field-media-annotated.component.scss']
})
export class FormlyFieldMediaAnnotatedComponent extends CustomFieldTypeAbstract {

  value: AnnotatedMedia;
  modalRef: BsModalRef;

  selectedAnnotationIndex?: number;
  selectedAnnotation: any;
  annotations;
  annotationsForm = new FormGroup({});
  annotationsFields = [
    {
      key: 'annotations',
      type: 'dynamic',
      templateOptions: {
        label: 'Annotations',
        limit: 30,
      },
      fieldArray: [],
      fieldGroups: [
        {
          _type: 'annotation',
          templateOptions: {
            label: 'Annotation',
            description: 'Annotation',
            nameExpression: 'Annotation',
            collapsed: false,
            allowCopy: false,
          },
          fieldGroup: [
            {
              key: 'x',
              type: 'input',
              templateOptions: {
                label: 'X',
                placeholder: 'X',
                required: true,
                disabled: true,
              },
            },
            {
              key: 'y',
              type: 'input',
              templateOptions: {
                label: 'Y',
                placeholder: 'Y',
                required: true,
                disabled: true,
              },
            },
            {
              key: 'content',
              type: 'dynamic',
              templateOptions: {
                label: 'Content',
                placeholder: 'Content',
                required: false
              },
              fieldArray: [],
              fieldGroups: null,
            }
          ]
        },
      ]
    },
  ];

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  constructor(protected modalService: BsModalService, protected schemaTransformService: SchemaTransformService) {
    super();
  }

  openLightbox(media: Media) {
    ImageHelper.setImage(media.original);
  }

  openModal(template: TemplateRef<any>) {
    if (this.to.disabled) {
      return;
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-xl modal-empty'});

    if (this.to.metadata.annotationSchema) {
      this.annotationsFields[0].fieldGroups[0].fieldGroup[2].fieldGroups = [
        {
          _type: 'content',
          templateOptions: {
            label: 'Content',
            description: 'Content',
            nameExpression: 'Content',
            collapsed: false,
            allowCopy: false,
          },
          fieldGroup: this.schemaTransformService.transformForm(this.to.metadata.annotationSchema)
        },
      ];
    }
  }

  close() {
    this.modalRef.hide();
  }

  onSelect(media: any) {
    this.modalRef.hide();

    if (!this.value) {
      this.value = {
        media: null,
        annotations: null,
      };
    }

    this.value.media = media;
    super.setValue(this.value);
  }

  annotateImage(event) {

    if (!this.selectedAnnotation) {
      return;
    }

    /**
     * calculate click position
     */
    const image = document.getElementById('pointer_div');
    const posX = event.offsetX ? (event.offsetX) : event.pageX - image.offsetLeft;
    const posY = event.offsetY ? (event.offsetY) : event.pageY - image.offsetTop;

    // console.log('clicked at ' + posX + ' ' + posY + ' image is displayed as ' + image.clientWidth + 'x' + image.clientHeight);

    const posXPercentage = posX / image.clientWidth;
    const posYPercentage = posY / image.clientHeight;

    // console.log('position in percentages ' + posXPercentage + ' ' + posYPercentage);

    /**
     * update form values
     */
    this.selectedAnnotation.x.formlyFields.formControl.setValue(posXPercentage);
    this.selectedAnnotation.y.formlyFields.formControl.setValue(posYPercentage);

    // tag.style.visibility = 'visible';
  }

  selectAnnotation(i: number) {
    let annotationsSchema = FormHelper.buildSchemaTree(this.annotationsFields, {});
    this.selectedAnnotationIndex = i;
    this.selectedAnnotation = annotationsSchema.annotations[this.selectedAnnotationIndex];
  }
}
