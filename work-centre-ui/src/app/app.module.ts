import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';
import { WelcomeScreenModule } from './application/welcomeScreen/welcomeScreen.module';
import { CommonControlsModule } from './library/commonControls.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonControlsModule,
    WelcomeScreenModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
