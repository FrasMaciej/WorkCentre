import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';

import { AboutUsModule } from './application/aboutUs/aboutUs.module';
import { AuthorizationModule } from './application/authorization/authorization.module';
import { DashboardModule } from './application/dashboard/dashboard.module';
import { WelcomeScreenModule } from './application/welcomeScreen/welcomeScreen.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AboutUsModule,
    AuthorizationModule,
    DashboardModule,
    WelcomeScreenModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
