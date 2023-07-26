import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenMainComponent } from './welcomeScreen/welcomeScreenMain.component';

const routes: Routes = [
  { path: '', component: WelcomeScreenMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
