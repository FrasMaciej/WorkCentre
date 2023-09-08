import { NgModule } from '@angular/core';
import { RegistrationPageComponent } from './registration/registrationPage.component';
import { LoginPageComponent } from './logging/loggingPage.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationConfirmationPageComponent } from './registration/registrationConfirmationPage.component';



@NgModule({
    imports: [CommonControlsModule, ReactiveFormsModule, CommonModule],
    exports: [],
    declarations: [RegistrationPageComponent, LoginPageComponent, RegistrationConfirmationPageComponent],
    providers: [],
})
export class AuthorizationModule { }
