import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ConversationComponent } from "./conversation/conversation.component";
import { ExploreComponent } from "./explore/explore.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuardService } from "../authorization/authGuard.service";

export const routes: Routes = [
    {
        component: DashboardComponent,
        path: 'dashboard',
        canActivate: [AuthGuardService],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
            { path: 'explore', component: ExploreComponent, canActivate: [AuthGuardService] },
            { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService] },
            { path: 'conversation', component: ConversationComponent, canActivate: [AuthGuardService] },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
        ]
    },

]