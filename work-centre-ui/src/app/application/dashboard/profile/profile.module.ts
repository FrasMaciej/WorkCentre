import { NgModule } from '@angular/core';
import { OwnProfileComponent } from './ownProfile/ownProfile.component';
import { CommonModule } from '@angular/common';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { UserProfileComponent } from './userProfile/userProfile.component';

@NgModule({
    imports: [CommonModule, CommonControlsModule],
    exports: [],
    declarations: [OwnProfileComponent, UserProfileComponent],
    providers: [],
})
export class ProfileModule { }
