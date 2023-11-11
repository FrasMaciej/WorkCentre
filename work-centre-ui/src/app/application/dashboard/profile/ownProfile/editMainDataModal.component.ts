import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-main-modal',
  template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Edit header information about your profile</h1>
    <div class="bg-white p-4 shadow-md">
      <form (ngSubmit)="saveChanges(mainForm)" #mainForm="ngForm">
        <div class="mb-4">
          <label for="headerInfo" class="block text-sm font-medium text-gray-600">Header Info:</label>
          <mat-form-field appearance="fill" class="w-full">
            <input matInput id="headerInfo" name="headerInfo" [(ngModel)]="data.userDetails.headerInfo" required minlength="3">
            <mat-error *ngIf="mainForm.controls['headerInfo']?.errors?.['required']">Header Info is required.</mat-error>
          </mat-form-field>
        </div>

        <div class="mb-4">
          <label for="company" class="block text-sm font-medium text-gray-600">Company:</label>
          <mat-form-field appearance="fill" class="w-full">
            <input matInput id="company" name="company" [(ngModel)]="data.userDetails.company" required minlength="3">
            <mat-error *ngIf="mainForm.controls['company']?.errors?.['required']">Company is required.</mat-error>
          </mat-form-field>
        </div>

        <div class="flex justify-end gap-x-4">
          <button mat-stroked-button color="basic" type="button" (click)="closeModal()">
            Cancel
          </button>
          <button mat-raised-button color="primary" type="submit" [disabled]="mainForm.invalid">
            Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
  `]
})
export class EditMainDataModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMainDataModalComponent>,
    private profileService: ProfileService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async saveChanges(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close();
      await this.profileService.updateUserProfile({
        _id: this.data.user._id,
        userDetails: {
          headerInfo: this.data.userDetails.headerInfo,
          company: this.data.userDetails.company,
          skills: this.data.userDetails.skills,
          profileDescription: this.data.userDetails.profileDescription,
          experience: this.data.userDetails.experience,
          phone: this.data.userDetails.phone,
          email: this.data.userDetails.email,
        }
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}