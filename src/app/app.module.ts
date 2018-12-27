import { NgModule } from '@angular/core';
import { AdminComponent } from '../../projects/ixocreate/ngx-admin/src/lib/admin.component';
import { environment } from '../environments/environment';
import { KiwiAdminModule } from '../../projects/ixocreate/ngx-admin/src/lib/kiwi-admin.module';

@NgModule({
  imports: [
    KiwiAdminModule.forRoot({
      environment: environment,
    }),
  ],
  declarations: [],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AppModule {
}
