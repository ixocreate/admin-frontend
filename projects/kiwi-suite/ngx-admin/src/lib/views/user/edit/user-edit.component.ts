import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { BsModalService } from 'ngx-bootstrap';
import { KiwiConfirmModalComponent } from '../../../modals/kiwi-confirm-modal/kiwi-confirm-modal.component';
import { ConfirmModalData } from '../../../modals/kiwi-confirm-modal/confirm-modal-data.interface';
import { ConfigService } from '../../../services/config.service';

@Component({
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;

  userId: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected config: ConfigService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.id;
      this.data$ = this.appData.getUserDetail(this.userId);
    });

    this.appData.getUserConfig().then((data: any) => {
      this.fields = data.update ?  this.schemaTransform.transformForm(data.update) : [];
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      this.appData.updateUser(this.userId, this.form.getRawValue()).then(() => {
        this.notification.success('User successfully updated', 'Success');
      }).catch((error) => this.notification.apiError(error));
    }
  }

  doDelete(): void {
    const initialState: ConfirmModalData = {
      title: 'Delete this user?',
      text: 'Do you really want to delete this user?',
      onConfirm: () => {
        this.appData.deleteUser(this.userId).then(() => {
          this.notification.success('User successfully deleted', 'Success');
          this.router.navigateByUrl('/admin-user');
        }).catch((error) => this.notification.apiError(error));
      },
    };
    this.modal.show(KiwiConfirmModalComponent, {initialState});
  }

}
