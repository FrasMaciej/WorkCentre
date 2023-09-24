import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { CommonControlsModule } from 'src/app/library/commonControls.module';

@NgModule({
    imports: [CommonModule, CommonControlsModule ],
    exports: [],
    declarations: [ProfileComponent],
    providers: [],
})
export class ProfileModule { }
