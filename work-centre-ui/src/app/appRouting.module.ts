import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenMainComponent } from './application/welcomeScreen/welcomeScreenMain.component';
import { RegistrationPageComponent } from './application/authorization/registration/registrationPage.component';
import { LoginPageComponent } from './application/authorization/logging/loggingPage.component';
import { AboutUsComponent } from './application/aboutUs/aboutUs.component';
import { DashboardComponent } from './application/panel/dashboard.component';
import { RegistrationConfirmationPageComponent } from './application/authorization/registration/registrationConfirmationPage.component';
import { AuthGuardService } from './application/authorization/authGuard.service';


const routes: Routes = [
  { path: '', component: WelcomeScreenMainComponent },
  { path: 'sign-in', component: LoginPageComponent },
  { path: 'sign-up', component: RegistrationPageComponent },
  { path: 'sign-up-confirmation', component: RegistrationConfirmationPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
