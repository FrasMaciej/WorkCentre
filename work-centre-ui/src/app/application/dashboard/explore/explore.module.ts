import { NgModule } from '@angular/core';
import { ExploreComponent } from './explore.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { UsersListComponent } from './usersList.component';
import { JobsListComponent } from './jobsList.component';
import { OrganizationsListComponent } from './oganizationsList.component';
import { CommonModule } from '@angular/common';
import { JobPageComponent } from './jobPage.component';
import { RecursiveFilterPipe } from './filter.pipe';

@NgModule({
    imports: [CommonControlsModule, FormsModule, ReactiveFormsModule, MatDividerModule, CommonModule],
    exports: [],
    declarations: [ExploreComponent, UsersListComponent, JobsListComponent, OrganizationsListComponent, JobPageComponent, RecursiveFilterPipe],
    providers: [],
})
export class ExploreModule { }
