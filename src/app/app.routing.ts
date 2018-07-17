import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent, PermissionGuard} from '@kiwi-suite/ngx-admin';

export const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PermissionGuard]
})
export class AppRoutingModule {
}
