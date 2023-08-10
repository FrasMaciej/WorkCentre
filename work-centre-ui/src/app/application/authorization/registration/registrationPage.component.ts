import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'registration-page',
    template: `
        <form class="example-form">
            <mat-form-field class="example-full-width">
                <mat-label>Email</mat-label>
                <input type="email" matInput [formControl]="emailFormControl" placeholder="Ex. pat@example.com">
                <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
                Please enter a valid email address
                </mat-error>
                <mat-error *ngIf="emailFormControl.hasError('required')">
                Email is <strong>required</strong>
                </mat-error>
            </mat-form-field>
        </form>
    `,
    styles: [`
    
    `]
})

export class RegistrationPageComponent implements OnInit {
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);


    constructor() { }

    ngOnInit() { }
}