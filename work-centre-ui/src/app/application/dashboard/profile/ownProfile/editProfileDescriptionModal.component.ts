import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile-description-modal',
  template: `
    <div class="bg-white p-4 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Edit Profile Description Section</h2>
      <form (ngSubmit)="saveChanges()" #profileDescriptionForm="ngForm">
        <div class="mb-4">
          <label for="profileDescription" class="block text-sm font-medium text-gray-600">Profile Description:</label>
          <textarea id="profileDescription" name="profileDescription" [(ngModel)]="data.userDetails.profileDescription" required
            class="w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>

        <div class="text-center">
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
  `]
})
export class EditProfileDescriptionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDescriptionModalComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  saveChanges() {
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
}