import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenMainComponent } from './application/welcomeScreen/welcomeScreenMain.component';
import { RegistrationPageComponent } from './application/authorization/registration/registrationPage.component';
import { LoginPageComponent } from './application/authorization/logging/loggingPage.component';


const routes: Routes = [
  { path: '', component: WelcomeScreenMainComponent },
  { path: 'sign-in', component: RegistrationPageComponent},
  { path: 'sign-up', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
