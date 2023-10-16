import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-skills-modal',
  template: `
    <div class="bg-white p-14 shadow-md" *ngIf="skills">
      <h2 class="text-2xl font-bold mb-4">Edit Skills Section</h2>
      <form (ngSubmit)="saveChanges()" #skillsForm="ngForm">
        <div class="mb-4" *ngFor="let skill of skills; let i = index">
          <div class="flex justify-between mb-2">
            <label for="skills" class="block text-sm font-medium text-gray-600">Skill {{ i + 1 }}:</label>
            <button type="button" (click)="removeSkill(i)" class="ml-2 bg-red-500 text-white p-2 rounded">
              Remove
            </button>
          </div>
          <div class="flex flex-col mb-4 items-center">
            <label for="skill" class="block text-sm font-medium text-gray-600">Name</label>
            <input type="text" id="skill" name="skill" [(ngModel)]="skills[i].name" required
              class="w-full border border-gray-300 rounded-md p-2">
            <label for="description" class="block text-sm font-medium text-gray-600">Description</label>
            <input type="text" id="description" name="description" [(ngModel)]="skills[i].description" required
              class="w-full border border-gray-300 rounded-md p-2">
          </div>
        </div>

        <div class="text-center">
          <button type="button" (click)="addSkill()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Skill
          </button>
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
export class EditSkillsModalComponent {
  skills: Array<Skill>;

  constructor(
    public dialogRef: MatDialogRef<EditSkillsModalComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (!this.data.userDetails?.skills || this.data.userDetails?.skills.length <= 0) {
      this.skills = [{ name: '', description: '' }]
    } else {
      console.log(this.data.userDetails.skills);
      this.skills = this.data.userDetails.skills;
    }
  }

  saveChanges() {
    this.dialogRef.close();
    this.profileService.updateUserProfile({
      _id: this.data.user._id,
      userDetails: {
        headerInfo: this.data.userDetails.headerInfo,
        company: this.data.userDetails.company,
        profileDescription: this.data.userDetails.profileDescription,
        experience: this.data.userDetails.experience,
        phone: this.data.userDetails.phone,
        email: this.data.userDetails.email,
        skills: this.skills
      }
    });
  }

  addSkill() {
    this.skills.push({ name: '', description: '' });
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }
}