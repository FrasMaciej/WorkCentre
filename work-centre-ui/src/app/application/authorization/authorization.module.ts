import { NgModule } from '@angular/core';
import { RegistrationPageComponent } from './registration/registrationPage.component';
import { LoginPageComponent } from './logging/loggingPage.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationConfirmationPageComponent } from './registration/registrationConfirmationPage.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';



@NgModule({
    imports: [CommonControlsModule, ReactiveFormsModule, CommonModule],
    exports: [],
    declarations: [RegistrationPageComponent, LoginPageComponent, RegistrationConfirmationPageComponent],
    providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
    ],
})
export class AuthorizationModule { }
