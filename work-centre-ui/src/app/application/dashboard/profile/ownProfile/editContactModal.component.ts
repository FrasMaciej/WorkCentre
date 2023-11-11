import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-contact-modal',
  template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Edit Contact Section</h1>
    <div class="bg-white p-4 shadow-md modal-size">
      <form [formGroup]="contactForm" (ngSubmit)="saveChanges()" class="gap-y-2">
        <div>
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Email</mat-label>
            <input matInput type="text" formControlName="email" required>
            <mat-error *ngIf="contactForm.get('email').hasError('required')">Email is required.</mat-error>
            <mat-error *ngIf="contactForm.get('email').hasError('email')">Email is invalid.</mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Phone</mat-label>
            <input matInput type="text" formControlName="phone" required>
            <mat-error *ngIf="contactForm.get('phone').hasError('required')">Phone is required.</mat-error>
          </mat-form-field>
        </div>

        <div class="flex justify-end gap-x-4">
          <button mat-stroked-button color="basic" type="button" (click)="closeModal()">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid">Save</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .modal-size {
      width: 400px;
      max-height: 300px;
      overflow-y: auto; 
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class EditContactModalComponent {
  contactForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditContactModalComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      email: [data.userDetails.email, [Validators.required, Validators.email]],
      phone: [data.userDetails.phone, Validators.required],
    });
  }

  saveChanges() {
    if (this.contactForm.invalid) return;

    this.dialogRef.close();
    this.profileService.updateUserProfile({
      _id: this.data.user._id,
      userDetails: {
        headerInfo: this.data.userDetails.headerInfo,
        company: this.data.userDetails.company,
        skills: this.data.userDetails.skills,
        profileDescription: this.data.userDetails.profileDescription,
        experience: this.data.userDetails.experience,
        phone: this.contactForm.value.phone,
        email: this.contactForm.value.email,
      }
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}