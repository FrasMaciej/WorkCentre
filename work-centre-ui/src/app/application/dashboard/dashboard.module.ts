import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { DashboardOptionsComponent } from './dashboardOptions.component';

@NgModule({
    imports: [CommonControlsModule],
    exports: [],
    declarations: [DashboardComponent, DashboardOptionsComponent],
    providers: [],
})
export class DashboardModule { }
