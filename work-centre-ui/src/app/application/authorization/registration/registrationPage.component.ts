import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'registration-page',
  template: `
  <body class="background bg-gradient-to-r from-blue-500 to-purple-600">
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <div class="flex justify-center items-center flex-col" >
        <a class="cursor-pointer" href="/">
          <div class="mt-2 text-6xl font-bold text-white">
            StarJobs
          </div>
        </a>
        <mat-card class="register-form flex flex-col justify-center items-center mb-4">
          <span class="mb-4 mt-1 text-xl text-center">
            Sign up to discover your new career possibilities for free!
          </span>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input type="email" matInput formControlName="email" placeholder="Ex. pat@example.com"/>
            <mat-error *ngIf="registrationForm.get('email')?.hasError('email') && !registrationForm.get('email')?.hasError('required')">
              Please enter a valid email address
            </mat-error>
            <mat-error *ngIf="registrationForm.get('email')?.hasError('required')">
              Email is <strong>required</strong>
            </mat-error>
            <mat-error *ngIf="registrationForm.get('email')?.hasError('emailTaken')">
              This email is already in use. Please use a different email address.
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input type="password" matInput formControlName="password"/>
            <mat-error *ngIf="registrationForm.get('password')?.hasError('required')">
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
                registrationForm.get('confirmPassword')?.hasError('required')">
              Confirm Password is <strong>required</strong>
            </mat-error>
            <mat-error *ngIf="passwordsDoNotMatch">
              Passwords do not match
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input type="text" matInput formControlName="firstName" />
            <mat-error *ngIf="registrationForm.get('firstName')?.hasError('required')">
              Name is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Surname</mat-label>
            <input type="text" matInput formControlName="lastName" />
            <mat-error
              *ngIf="registrationForm.get('lastName')?.hasError('required')">
              Surname is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <button class="sign-up-btn m-2" mat-fab extended color="accent" [disabled]="signupButtonDisabled">
            Sign up
          </button>
          <span class="mt-2">Already have an account? <b class="cursor-pointer" (click)="navigateToSignIn()">Sign in</b> </span>
        </mat-card>
      </div>
    </form>
  </body>
  `,
  styles: [
    `

body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.background {
  height: 100%;
  background: linear-gradient(to right, #3498db, #8e44ad); /* Adjust the gradient colors as needed */
}
      .register-form {
        margin-top: 25px;
        height: 50%;
        width: 700px;
        border-radius: 2rem;
        padding-top: 15px;
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

      a {
          text-decoration: none;
          color: black;
        }
    `,
  ],
})
export class RegistrationPageComponent implements OnInit {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });
  signupButtonDisabled = false;
  emailAlreadyExists = false;

  get passwordsDoNotMatch() {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit() { }

  async onSubmit() {
    this.signupButtonDisabled = true;
    if (this.registrationForm.valid) {
      try {
        await this.authorizationService.registerUser({
          password: this.registrationForm.value.password!,
          email: this.registrationForm.value.email!,
          firstName: this.registrationForm.value.firstName!,
          lastName: this.registrationForm.value.lastName!
        });
        this.router.navigate(['sign-up-confirmation', this.registrationForm.get('email')?.value]);
      } catch (err) {
        this.registrationForm.get('email')?.setValue('');
        this.registrationForm.get('email')?.markAsTouched();
        this.registrationForm.get('email')?.setErrors({ emailTaken: true });
      }
    }
    this.signupButtonDisabled = false;
  }

  navigateToSignIn() {
    this.router.navigate(['sign-in']);
  }

}