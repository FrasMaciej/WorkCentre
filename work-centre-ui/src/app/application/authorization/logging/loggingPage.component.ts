import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  template: `
    <form [formGroup]="loggingForm">
      <div class="flex justify-center items-center flex-col">
        <a href="/"> 
            <svg-icon src="assets/logo/logoBlack.svg" [svgStyle]="{ 'width.px':500, 'height.px': 200 }"></svg-icon> 
        </a>
        <mat-card class="login-form flex flex-col justify-center items-center">
          <span class="mb-4 text-xl text-center">
            Log in to your account
          </span>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input type="email" matInput formControlName="email" placeholder="Ex. pat@example.com"/>
            <mat-error *ngIf="loggingForm.get('email')?.hasError('email') && !loggingForm.get('email')?.hasError('required')">
              Please enter a valid email address
            </mat-error>
            <mat-error *ngIf="loggingForm.get('email')?.hasError('required')">
              Email is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input type="password" matInput formControlName="password"/>
            <mat-error *ngIf="loggingForm.get('password')?.hasError('required')">
              Password is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <button class="sign-in-btn" mat-fab extended color="accent">
            Sign in
          </button>
          <span class="mt-4">Tou do not have an account? <b class="cursor-pointer" (click)="navigateToSignUp()">Sign up</b> </span>
        </mat-card>
      </div>
    </form>
    `,
  styles: [`
        .login-form {
            margin-top: 50px;
            width: 600px;
            border-radius: 2rem;
            padding-top: 25px;
            padding-bottom: 25px;
        }

        mat-form-field {
            width: 400px;
        }

        .sign-in-btn {
            width: 200px;
        }

        @media (max-width: 768px) {
            .login-form {
                width: 90%;
            }

            mat-form-field {
                width: 90%;
            }
        }    
    `]
})

export class LoginPageComponent implements OnInit {
  loggingForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get passwordsDoNotMatch() {
    const password = this.loggingForm.get('password')?.value;
    const confirmPassword = this.loggingForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit() { }

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }
}