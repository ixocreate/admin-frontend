import { NgModule } from '@angular/core';
import { NgxAdminModule } from '../../projects/kiwi-suite/ngx-admin/src/lib/ngx-admin.module';
import { AdminComponent } from '../../projects/kiwi-suite/ngx-admin/src/lib/admin.component';
import { environment } from '../environments/environment';


@NgModule({
  imports: [
    NgxAdminModule.forRoot({
      environment: environment,
    }),
  ],
  declarations: [],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AppModule {
}
