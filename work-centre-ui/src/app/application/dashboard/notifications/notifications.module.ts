import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonControlsModule, CommonModule],
    exports: [],
    declarations: [NotificationsComponent],
    providers: [],
})
export class NotificationsModule { }
