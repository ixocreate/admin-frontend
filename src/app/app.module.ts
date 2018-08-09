import { NgModule } from '@angular/core';
import { NgxAdminModule } from '../../projects/kiwi-suite/ngx-admin/src/lib/ngx-admin.module';
import { AdminComponent } from '../../projects/kiwi-suite/ngx-admin/src/lib/admin.component';


@NgModule({
  imports: [
    NgxAdminModule.forRoot(),
  ],
  declarations: [],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AppModule {
}
