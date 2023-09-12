import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';

import { AboutUsModule } from './application/aboutUs/aboutUs.module';
import { AuthorizationModule } from './application/authorization/authorization.module';
import { DashboardModule } from './application/panel/dashboard.module';
import { WelcomeScreenModule } from './application/welcomeScreen/welcomeScreen.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AboutUsModule,
    AuthorizationModule,
    DashboardModule,
    WelcomeScreenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
