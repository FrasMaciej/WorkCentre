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

@NgModule({
    imports: [CommonModule, CommonControlsModule, RouterModule, ConversationModule, ExploreModule, HomeModule, NotificationsModule, ProfileModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [DashboardComponent, DashboardOptionsComponent],
    providers: [],
})
export class DashboardModule { }
