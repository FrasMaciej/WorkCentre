import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';
import { WelcomeScreenModule } from './application/welcomeScreen/welcomeScreen.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WelcomeScreenModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
