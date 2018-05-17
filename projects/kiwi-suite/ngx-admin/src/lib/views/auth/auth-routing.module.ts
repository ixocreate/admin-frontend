import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ResetComponent} from './reset/reset.component';

const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login'
                }
            },
            {
                path: 'reset',
                component: ResetComponent,
                data: {
                    title: 'Reset Password'
                }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
