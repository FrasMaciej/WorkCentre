import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-experience-modal',
  template: `
    <div class="modal-content p-14">
      <div class="modal-header">
        <h2 class="modal-title text-2xl font-bold">Edit Experience Section</h2>
      </div>
      <div class="modal-body">
        <form [formGroup]="experienceForm" (ngSubmit)="saveChanges()">
          <div formArrayName="experience">
            <div *ngFor="let expCtrl of experienceForm.get('experience')['controls']; let i = index" class="mb-4">
              <div class="flex flex-row justify-between mb-2">
                <label class="block text-sm font-medium text-gray-600">{{i+1}}. Experience Name:</label>
                <button type="button" (click)="removeExperience(i)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">
                  Remove
                </button>
              </div>
              <input type="text" [formControl]="expCtrl.get('name')" required
                class="w-full border border-gray-300 rounded-md p-2">
              
              <label class="block text-sm font-medium text-gray-600 mt-1">Period:</label>
              <mat-form-field>
                <mat-label>Enter a date range</mat-label>
                <mat-date-range-input [rangePicker]="picker" [formGroup]="expCtrl.get('period').get('form')">
                  <input matStartDate placeholder="Start date" formControlName="start">
                  <input matEndDate placeholder="End date" formControlName="end">
                </mat-date-range-input>
                <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-date-range-picker #picker></mat-date-range-picker>
              </mat-form-field>
            </div>
          </div>

          <div class="text-center">
            <button type="button" (click)="addExperience()"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add next experience
            </button>
          </div>

          <div class="text-center mt-4">
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
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
export class EditExperienceModalComponent {
  experienceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditExperienceModalComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.experienceForm = this.fb.group({
      experience: this.fb.array([]),
    });

    if (this.data.userDetails?.experience && this.data.userDetails?.experience.length > 0) {
      this.data.userDetails.experience.forEach((exp: any) => this.addExperience(exp));
    } else {
      this.addExperience(); // Dodaj domyślny rekord, jeśli brak
    }
  }

  saveChanges() {
    this.dialogRef.close();
    const updatedExperience = this.experienceForm.value.experience;
    this.profileService.updateUserProfile({
      _id: this.data.user._id,
      userDetails: {
        headerInfo: this.data.userDetails.headerInfo,
        company: this.data.userDetails.company,
        skills: this.data.userDetails.skills,
        profileDescription: this.data.userDetails.profileDescription,
        experience: updatedExperience.map((exp: any) => ({
          name: exp.name,
          period: {
            from: exp.period.form.start,
            to: exp.period.form.end
          }
        })),
        phone: this.data.userDetails.phone,
        email: this.data.userDetails.email,
      }
    });
  }

  addExperience(experience?: any) {
    const experienceGroup = this.fb.group({
      name: [experience ? experience.name : '', Validators.required],
      period: this.fb.group({
        form: this.fb.group({
          start: [experience ? experience.period.from : new Date()],
          end: [experience ? experience.period.to : new Date()],
        })
      })
    });

    (this.experienceForm.get('experience') as FormArray).push(experienceGroup);
  }

  removeExperience(index: number) {
    (this.experienceForm.get('experience') as FormArray).removeAt(index);
  }
}