import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile-description-modal',
  template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Edit your profile description</h1>
    <div class="bg-white p-4 shadow-md">
      <form (ngSubmit)="saveChanges(profileDescriptionForm)" #profileDescriptionForm="ngForm" class="flex flex-col justify-between  modal-size">
        <div class="mb-4">
          <label for="profileDescription" class="block text-sm font-medium text-gray-600">Profile Description:</label>
          <mat-form-field>
            <textarea 
              matInput id="profileDescription" name="profileDescription" 
              [(ngModel)]="data.userDetails.profileDescription" required
              class="w-full border border-gray-300 rounded-md"
              #profileDescription="ngModel">
            </textarea>
            <mat-error *ngIf="profileDescription.invalid && (profileDescription.dirty || profileDescription.touched)">
              Profile description is required.
            </mat-error>
          </mat-form-field>
        </div>
        <div class="flex justify-end gap-x-4">
          <button mat-stroked-button color="basic" type="button" (click)="closeModal()">
            Cancel
          </button>
          <button mat-raised-button color="primary" type="submit" [disabled]="profileDescriptionForm.invalid">
            Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }

    .modal-size {
      width: 500px;
      min-height: 400px;
    }

  `]
})
export class EditProfileDescriptionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDescriptionModalComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  saveChanges(profileDescriptionForm: NgForm) {
    if (profileDescriptionForm.invalid) {
      return;
    }

    this.dialogRef.close();
    this.profileService.updateUserProfile({
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

  closeModal(): void {
    this.dialogRef.close();
  }
}