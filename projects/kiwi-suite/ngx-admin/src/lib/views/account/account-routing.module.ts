import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {AccountComponent} from './account.component';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home',
        },
        children: [
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Account'
                        },
                        children: [
                            {
                                path: '',
                                component: AccountComponent,
                                data: {
                                    title: 'Settings',
                                },
                            }
                        ],
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
