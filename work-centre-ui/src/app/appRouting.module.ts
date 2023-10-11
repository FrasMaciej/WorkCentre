import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenMainComponent } from './application/welcomeScreen/welcomeScreenMain.component';
import { RegistrationPageComponent } from './application/authorization/registration/registrationPage.component';
import { LoginPageComponent } from './application/authorization/logging/loggingPage.component';
import { AboutUsComponent } from './application/aboutUs/aboutUs.component';
import { DashboardComponent } from './application/dashboard/dashboard.component';
import { RegistrationConfirmationPageComponent } from './application/authorization/registration/registrationConfirmationPage.component';
import { AuthGuardService } from './application/authorization/authGuard.service';
import { IsLoggedInService } from './application/authorization/isLoggedInGuard.service';
import { NotFoundPageComponent } from './application/notFoundPage/notFoundPage.component';


const routes: Routes = [

  { path: '', component: WelcomeScreenMainComponent, canActivate: [IsLoggedInService] },
  { path: 'sign-in', component: LoginPageComponent, canActivate: [IsLoggedInService] },
  { path: 'sign-up', component: RegistrationPageComponent, canActivate: [IsLoggedInService] },
  { path: 'sign-up-confirmation/:e-mail', component: RegistrationConfirmationPageComponent, canActivate: [IsLoggedInService] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [IsLoggedInService] },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
