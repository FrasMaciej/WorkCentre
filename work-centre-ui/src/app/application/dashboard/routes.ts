import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ConversationComponent } from "./conversation/conversation.component";
import { ExploreComponent } from "./explore/explore.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { OwnProfileComponent } from "./profile/ownProfile/ownProfile.component";
import { AuthGuardService } from "../authorization/authGuard.service";
import { UserProfileComponent } from "./profile/userProfile/userProfile.component";
import { RecruiterPanelComponent } from "./recruiterPanel/recruiterPanel.component";

export const routes: Routes = [
    {
        component: DashboardComponent,
        path: 'dashboard',
        canActivate: [AuthGuardService],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', component: HomeComponent },
            { path: 'explore', component: ExploreComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'conversation', component: ConversationComponent },
            { path: 'recruiter-panel', component: RecruiterPanelComponent },
            {
                path: 'profile', children: [
                    {
                        path: 'me', component: OwnProfileComponent,
                    },
                    {
                        path: ':id', component: UserProfileComponent
                    }
                ]
            },
        ]
    },

]