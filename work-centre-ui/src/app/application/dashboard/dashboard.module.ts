import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { DashboardOptionsComponent } from './dashboardOptions.component';
import { RouterModule } from '@angular/router';
import { ConversationModule } from './conversation/conversation.module';
import { ExploreModule } from './explore/explore.module';
import { HomeModule } from './home/home.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProfileModule } from './profile/profile.module';
import { routes } from './routes';
import { CommonModule } from '@angular/common';
import { ConversationsListComponent } from './conversation/conversationsList.component';
import { RecruiterPanelModule } from './recruiterPanel/recruiterPanel.module';
import { StatusModalComponent } from './recruiterPanel/statusModal.component';


@NgModule({
    imports: [
        CommonModule, CommonControlsModule, RouterModule, ConversationModule, ExploreModule,
        HomeModule, NotificationsModule, ProfileModule, RecruiterPanelModule, RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [DashboardComponent, DashboardOptionsComponent, ConversationsListComponent, StatusModalComponent],
    providers: [],
})
export class DashboardModule { }
