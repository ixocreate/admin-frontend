import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { AccountComponent } from './views/account/account.component';
import { PageComponent } from './views/page/page.component';
import { TranslationComponent } from './views/translation/translation.component';
import { TranslationListComponent } from './views/translation/list/translation-list.component';
import { TranslationEditComponent } from './views/translation/edit/translation-edit.component';
import { MediaComponent } from './views/media/media.component';
import { ResourceComponent } from './views/resource/resource.component';
import { ResourceCreateComponent } from './views/resource/create/resource-create.component';
import { ResourceEditComponent } from './views/resource/edit/resource-edit.component';
import { PageCreateComponent } from './views/page/create/page-create.component';
import { PageAddComponent } from './views/page/add/page-add.component';
import { PageEditComponent } from './views/page/edit/page-edit.component';
import { MediaEditComponent } from './views/media/edit/media-edit.component';
import { UserComponent } from './views/user/user.component';
import { UserCreateComponent } from './views/user/create/user-create.component';
import { UserEditComponent } from './views/user/edit/user-edit.component';
import { SubComponent } from './views/page/sub/sub.component';
import { FlatComponent } from './views/page/flat/flat.component';
import { FlatCreateComponent } from './views/page/flat/flat-create.component';
import { FlatAddComponent } from './views/page/flat/flat-add.component';
import { SubCreateComponent } from './views/page/sub/sub-create.component';
import { SubAddComponent } from './views/page/sub/sub-add.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RedirectComponent } from './views/redirect/redirect.component';
import { RegistryComponent } from './views/registry/registry.component';
import { RegistryEditComponent } from './views/registry/edit/registry-edit.component';
import { ErrorComponent } from './views/error/error.component';

export const routes: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {title: 'Error'},
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: '', component: RedirectComponent},
      {
        path: 'account',
        component: AccountComponent,
        data: {title: 'Account'},
      },
      {
        path: 'page',
        data: {title: 'Sitemap'},
        children: [
          {
            path: '',
            component: PageComponent,
            data: {title: null},
          },
          {
            path: 'create/:locale',
            component: PageCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'create/:locale/:parentSitemapId',
            component: PageCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'add/:locale/:sitemapId',
            component: PageAddComponent,
            data: {title: 'Add Page'},
          },
          {
            path: ':id/edit',
            component: PageEditComponent,
            data: {title: 'Edit Page'},
          },
        ],
      },
      {
        path: 'page-sub/:handle',
        data: {title: null},
        children: [
          {
            path: '',
            component: SubComponent,
            data: {title: 'Sitemap'},
          },
          {
            path: 'create/:locale',
            component: PageCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'create/:locale/:parentSitemapId',
            component: FlatCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'add/:locale/:sitemapId',
            component: FlatAddComponent,
            data: {title: 'Add Page'},
          },
          {
            path: ':id/edit',
            component: PageEditComponent,
            data: {title: 'Edit Page'},
          },
        ],
      },
      {
        path: 'page-flat/:handle',
        data: {title: null},
        children: [
          {
            path: '',
            component: FlatComponent,
            data: {title: 'Pages'},
          },
          {
            path: 'create/:locale/:parentSitemapId',
            component: SubCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'add/:locale/:sitemapId',
            component: SubAddComponent,
            data: {title: 'Add Page'},
          },
          {
            path: ':id/edit',
            component: PageEditComponent,
            data: {title: 'Edit Page'},
          },
        ],
      },
      {
        path: 'dashboard',
        data: {title: 'Dashboard'},
        children: [
          {
            path: '',
            component: DashboardComponent,
            data: {title: null},
          },
        ],
      },
      {
        path: 'media',
        data: {title: 'Media'},
        children: [
          {
            path: '',
            component: MediaComponent,
            data: {title: null},
          },
          {
            path: ':id/edit',
            component: MediaEditComponent,
            data: {title: 'Edit'},
          },
        ],
      },
      {
        path: 'translation',
        data: {title: 'Translation'},
        children: [
          {
            path: '',
            component: TranslationComponent,
            data: {title: null},
          },
          {
            path: 'catalogue/:catalogue',
            data: {title: 'Catalogue'},
            children: [
              {
                path: '',
                component: TranslationListComponent,
                data: {title: null},
              },
              {
                path: ':id/edit',
                component: TranslationEditComponent,
                data: {title: 'Edit'},
              },
            ],
          },
        ],
      },
      {
        path: 'resource/:type',
        data: {title: '{resource}'},
        children: [
          {
            path: '',
            component: ResourceComponent,
            data: {title: null},
          },
          {
            path: 'create',
            component: ResourceCreateComponent,
            data: {title: 'Create'},
          },
          {
            path: ':id/edit',
            component: ResourceEditComponent,
            data: {title: 'Edit'},
          },
          {
            path: ':id/view',
            component: ResourceEditComponent,
            data: {title: 'View', viewOnly: true},
          },
        ],
      },
      {
        path: 'admin-user',
        data: {title: 'Users'},
        children: [
          {
            path: '',
            component: UserComponent,
            data: {title: null},
          },
          {
            path: 'create',
            component: UserCreateComponent,
            data: {title: 'Create'},
          },
          {
            path: ':id/edit',
            component: UserEditComponent,
            data: {title: 'Edit'},
          },
        ],
      },
      {
        path: 'registry',
        data: {title: 'Registry'},
        children: [
          {
            path: '',
            component: RegistryComponent,
            data: {title: null},
          },
          {
            path: ':id/edit',
            component: RegistryEditComponent,
            data: {title: 'Edit'},
          },
        ],
      },
      {
        path: '**',
        component: RedirectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class IxoAdminRouting {
}
