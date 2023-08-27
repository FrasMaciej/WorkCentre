import { NgModule } from '@angular/core';
import { RegistrationPageComponent } from './registration/registrationPage.component';
import { LoginPageComponent } from './logging/loggingPage.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonControlsModule, ReactiveFormsModule],
    exports: [],
    declarations: [RegistrationPageComponent, LoginPageComponent],
    providers: [],
})
export class AuthorizationModule { }
