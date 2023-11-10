import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-skills-modal',
  template: `
    <div class="bg-white p-14 shadow-md" *ngIf="skillsForm">
      <h2 class="text-2xl font-bold mb-4">Edit Skills Section</h2>
      <form [formGroup]="skillsForm" (ngSubmit)="saveChanges()" class="modal-body">
        <div formArrayName="skills">
          <div *ngFor="let skillGroup of skillsForm.controls['skills']['controls']; let i = index">
            <div class="flex justify-between mb-2">
              <label class="block text-sm font-medium text-gray-600">Skill {{ i + 1 }}:</label>
              <button type="button" (click)="removeSkill(i)" class="ml-2 bg-red-500 text-white p-2 rounded">
                Remove
              </button>
            </div>
            <div formGroupName="{{ i }}" class="flex flex-col mb-4 items-center">
              <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" id="name" formControlName="name" required
                class="w-full border border-gray-300 rounded-md p-2">
              <label for="description" class="block text-sm font-medium text-gray-600">Description</label>
              <input type="text" id="description" formControlName="description" required
                class="w-full border border-gray-300 rounded-md p-2">
            </div>
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
      .modal-body {
        max-height: 400px; 
        overflow-y: auto; 
        padding: 40px;
      }
  `]
})
export class EditSkillsModalComponent {
  skillsForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSkillsModalComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([]),
    });

    if (!this.data.userDetails?.skills || this.data.userDetails?.skills.length <= 0) {
      this.addSkill(); // Dodajemy domyślny skill, jeśli brak
    } else {
      this.data.userDetails.skills.forEach(skill => this.addSkill(skill));
    }
  }

  saveChanges() {
    this.dialogRef.close();
    const updatedSkills = this.skillsForm.value.skills;
    this.profileService.updateUserProfile({
      _id: this.data.user._id,
      userDetails: {
        headerInfo: this.data.userDetails.headerInfo,
        company: this.data.userDetails.company,
        profileDescription: this.data.userDetails.profileDescription,
        experience: this.data.userDetails.experience,
        phone: this.data.userDetails.phone,
        email: this.data.userDetails.email,
        skills: updatedSkills
      }
    });
  }

  addSkill(skill?: { name: string, description: string }) {
    const skillGroup = this.fb.group({
      name: [skill ? skill.name : '', Validators.required],
      description: [skill ? skill.description : '', Validators.required]
    });
    (this.skillsForm.get('skills') as FormArray).push(skillGroup);
  }

  removeSkill(index: number) {
    (this.skillsForm.get('skills') as FormArray).removeAt(index);
  }
}