import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';

@Component({
    selector: 'registration-page',
    template: `
    <form [formGroup]="registrationForm">
      <div class="flex justify-center items-center flex-col">
        <a href="/"> 
          <svg-icon src="assets/logo/logoBlack.svg" [svgStyle]="{ 'width.px':500, 'height.px': 200 }"></svg-icon> 
        </a>
        <mat-card class="register-form flex flex-col justify-center items-center">
          <span class="mb-4 text-xl text-center">
            Sign up to discover your new career possibilities for free!
          </span>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input type="email" matInput formControlName="email" placeholder="Ex. pat@example.com"/>
            <mat-error *ngIf="registrationForm.get('email').hasError('email') && !registrationForm.get('email').hasError('required')">
              Please enter a valid email address
            </mat-error>
            <mat-error *ngIf="registrationForm.get('email').hasError('required')">
              Email is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input type="password" matInput formControlName="password"/>
            <mat-error *ngIf="registrationForm.get('password').hasError('required')">
              Password is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Confirm Password</mat-label>
            <input
              type="password"
              matInput
              formControlName="confirmPassword"/>
            <mat-error
              *ngIf="
                registrationForm.get('confirmPassword').hasError('required')">
              Confirm Password is <strong>required</strong>
            </mat-error>
            <mat-error *ngIf="passwordsDoNotMatch">
              Passwords do not match
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input type="text" matInput formControlName="name" />
            <mat-error *ngIf="registrationForm.get('name').hasError('required')">
              Name is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Surname</mat-label>
            <input type="text" matInput formControlName="surname" />
            <mat-error
              *ngIf="registrationForm.get('surname').hasError('required')">
              Surname is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <button class="sign-up-btn" mat-fab extended color="accent">
            Sign up
          </button>
          <span class="mt-4">Already have an account? <a href="/sign-in">Sign in</a> </span>
        </mat-card>
      </div>
    </form>
  `,
    styles: [
        `
      .register-form {
        margin-top: 50px;
        height: 50%;
        width: 600px;
        border-radius: 2rem;
        padding-top: 25px;
        padding-bottom: 25px;
      }

      mat-form-field {
        width: 400px;
      }

      .sign-up-btn {
            width: 200px;
        }

      @media (max-width: 768px) {
        .register-form {
          width: 90%;
        }

        mat-form-field {
            width: 90%;
        }
      }
    `,
    ],
})
export class RegistrationPageComponent implements OnInit {
    registrationForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
    });

    get passwordsDoNotMatch() {
        const password = this.registrationForm.get('password')?.value;
        const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
        return password !== confirmPassword;
    }

    constructor(private authorizationService: AuthorizationService) { }

    ngOnInit() { }
}