import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenMainComponent } from './application/welcomeScreen/welcomeScreenMain.component';
import { RegistrationPageComponent } from './application/authorization/registration/registrationPage.component';
import { LoginPageComponent } from './application/authorization/logging/loggingPage.component';
import { AboutUsComponent } from './application/aboutUs/aboutUs.component';
import { PanelComponent } from './application/panel/panel.component';


const routes: Routes = [
  { path: '', component: WelcomeScreenMainComponent },
  { path: 'sign-in', component: LoginPageComponent },
  { path: 'sign-up', component: RegistrationPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'panel', component: PanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
