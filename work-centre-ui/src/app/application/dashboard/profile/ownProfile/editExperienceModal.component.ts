import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-experience-modal',
  template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Edit Experience Section</h1>
    <div class="bg-white p-4 shadow-md modal-size" *ngIf="experienceForm">
      <form [formGroup]="experienceForm" (ngSubmit)="saveChanges()" class="flex flex-col justify-between">
        <div formArrayName="experience" class="mb-8">
          <div *ngFor="let expCtrl of experienceForm.controls['experience']['controls']; let i = index" class="mb-4">
            <div class="flex justify-between mb-2">
              <label class="block text-sm font-medium text-gray-600">Experience {{i+1}}:</label>
              <button type="button" (click)="removeExperience(i)" class="ml-2 bg-red-500 text-white p-2 rounded">
                Remove
              </button>
            </div>
            <div formGroupName="{{ i }}" class="flex flex-col mb-4 items-center">
              <mat-form-field appearance="fill" class="w-full">
                <mat-label>Experience Name</mat-label>
                <input matInput formControlName="name" required>
                <mat-error *ngIf="experienceForm.get('experience').get(i.toString()).get('name').hasError('required')">
                  Experience Name is required.
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" class="w-full">
                <mat-label>Experience Company/Place</mat-label>
                <input matInput formControlName="place" required>
                <mat-error *ngIf="experienceForm.get('experience').get(i.toString()).get('place').hasError('required')">
                  Experience Company/Place is required.
                </mat-error>
              </mat-form-field>
              
              <mat-form-field appearance="fill" class="w-full">
                <mat-label>Period</mat-label>
                <mat-date-range-input [rangePicker]="picker" [formGroup]="expCtrl.get('period').get('form')">
                  <input matStartDate placeholder="Start date" formControlName="start">
                  <input matEndDate placeholder="End date" formControlName="end">
                </mat-date-range-input>
                <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-date-range-picker #picker></mat-date-range-picker>
              </mat-form-field>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button mat-stroked-button color="basic" type="button" (click)="addExperience()">
            Add next experience
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
      this.addExperience();
    }
  }

  saveChanges() {
    if (this.experienceForm.invalid) return;

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
          place: exp.place,
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
      place: [experience ? experience.place : '', Validators.required],
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

  closeModal(): void {
    this.dialogRef.close();
  }
}