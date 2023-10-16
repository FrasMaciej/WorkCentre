import { NgModule } from '@angular/core';
import { OwnProfileComponent } from './ownProfile/ownProfile.component';
import { CommonModule } from '@angular/common';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { EditMainDataModalComponent } from './ownProfile/editMainDataModal.component';
import { EditSkillsModalComponent } from './ownProfile/editSkillsModal.component';
import { EditContactModalComponent } from './ownProfile/editContactModal.component';
import { EditExperienceModalComponent } from './ownProfile/editExperienceModal.component';
import { EditProfileDescriptionModalComponent } from './ownProfile/editProfileDescriptionModal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, CommonControlsModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [OwnProfileComponent, UserProfileComponent, EditMainDataModalComponent, EditSkillsModalComponent, EditContactModalComponent,
        EditExperienceModalComponent, EditProfileDescriptionModalComponent],
    providers: [],
})
export class ProfileModule { }
