import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-skills-modal',
  template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Edit Skills Section</h1>
    <div class="bg-white p-4 shadow-md modal-size" *ngIf="skillsForm">
      <form [formGroup]="skillsForm" (ngSubmit)="saveChanges()" class="flex flex-col justify-between">
      <div formArrayName="skills">
          <div *ngFor="let skillGroup of skillsForm.controls['skills']['controls']; let i = index">
            <div class="flex justify-between mb-2">
              <label class="block text-sm font-medium text-gray-600">Skill {{ i + 1 }}:</label>
              <button type="button" (click)="removeSkill(i)" class="ml-2 bg-red-500 text-white p-2 rounded">
                Remove
              </button>
            </div>
            <div formGroupName="{{ i }}" class="flex flex-col mb-4 items-center">
              <mat-form-field appearance="fill">
                <mat-label>Name</mat-label>
                <input matInput type="text" formControlName="name" required>
                <mat-error *ngIf="skillsForm.get('skills').get(i.toString()).get('name').hasError('required')">
                  Name is required.
                </mat-error>
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Description</mat-label>
                <input matInput type="text" formControlName="description" required>
                <mat-error *ngIf="skillsForm.get('skills').get(i.toString()).get('description').hasError('required')">
                  Description is required.
                </mat-error>
              </mat-form-field>
            </div>
          </div>
        </div>

        <div class="flex justify-between gap-x-4">
          <button mat-stroked-button color="basic" type="button" (click)="addSkill()">
            Add next skill
          </button>
          <div class="flex gap-x-4">
            <button mat-stroked-button color="basic" type="button" (click)="closeModal()">
              Cancel
            </button>
            <button type="submit" mat-raised-button color="primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .modal-size {
      width: 500px;
      max-height: 600px;
      overflow-y: auto; 
    }

    mat-form-field {
      width: 100%;
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
    if (this.skillsForm.invalid) {
      return;
    }

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

  closeModal(): void {
    this.dialogRef.close();
  }
}