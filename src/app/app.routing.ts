import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from '../../projects/ixocreate/ngx-admin/src/lib/containers/default-layout/default-layout.component';
import {AuthGuard} from "../../projects/ixocreate/ngx-admin/src/lib/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
