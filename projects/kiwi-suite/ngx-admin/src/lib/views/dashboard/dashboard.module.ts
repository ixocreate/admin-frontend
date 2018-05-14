import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {DashboardRoutingModule} from './dashboard-routing.module';

import {DashboardComponent} from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartsModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {
    constructor() {
    }
}
