import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-main-modal',
  template: `
    <div class="bg-white p-4 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Edit Main Section</h2>
      <form (ngSubmit)="saveChanges()" #mainForm="ngForm">
        <div class="mb-4">
          <label for="headerInfo" class="block text-sm font-medium text-gray-600">Header Info:</label>
          <input type="text" id="headerInfo" name="headerInfo" [(ngModel)]="data.userDetails.headerInfo"
            class="w-full border border-gray-300 rounded-md p-2">
        </div>

        <div class="mb-4">
          <label for="company" class="block text-sm font-medium text-gray-600">Company:</label>
          <input type="text" id="company" name="company" [(ngModel)]="data.userDetails.company"
            class="w-full border border-gray-300 rounded-md p-2">
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
export class EditMainDataModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMainDataModalComponent>,
    private profileService: ProfileService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  async saveChanges() {
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