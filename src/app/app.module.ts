import { NgModule } from '@angular/core';
import { AdminComponent } from '../../projects/ixocreate/ngx-admin/src/lib/admin.component';
import { environment } from '../environments/environment';
import { IxoAdminModule } from '../../projects/ixocreate/ngx-admin/src/lib/ixo-admin.module';

@NgModule({
  imports: [
    IxoAdminModule.forRoot({
      environment,
    }),
  ],
  declarations: [],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AppModule {
}
