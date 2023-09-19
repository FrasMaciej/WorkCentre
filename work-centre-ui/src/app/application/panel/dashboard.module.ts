import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';


@NgModule({
    imports: [CommonControlsModule],
    exports: [],
    declarations: [DashboardComponent],
    providers: [],
})
export class DashboardModule { }
