import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-experience-modal',
  template: `
    <div class="modal-content p-14">
      <div class="modal-header">
        <h2 class="modal-title text-2xl font-bold">Edit Experience Section</h2>
      </div>
      <div class="modal-body">
        <form (ngSubmit)="saveChanges()" #experienceForm="ngForm">
          <div *ngFor="let exp of experience; let i = index" class="mb-4">
            <div class="flex flex-row justify-between mb-2">
              <label class="block text-sm font-medium text-gray-600">{{i+1}}. Experience Name:</label>
              <button type="button" (click)="removeExperience(i)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">
                Remove
              </button>
            </div>
            <input type="text" [(ngModel)]="experience[i].name" name="experienceName" required
              class="w-full border border-gray-300 rounded-md p-2">
            
            <label class="block text-sm font-medium text-gray-600 mt-1">Period:</label>
            <mat-form-field>
              <mat-label>Enter a date range</mat-label>
              <mat-date-range-input [rangePicker]="picker" [formGroup]="experience[i]?.period?.form">
                <input matStartDate placeholder="Start date" formControlName="start">
                <input matEndDate placeholder="End date" formControlName="end">
              </mat-date-range-input>
              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-date-range-picker #picker></mat-date-range-picker>
            </mat-form-field>
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
  experience: Array<UserExperienceDto>;

  constructor(
    public dialogRef: MatDialogRef<EditExperienceModalComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.experience = this.data.userDetails?.experience ? [
      ...this.data.userDetails?.experience.map((exp: any) => ({
        name: exp.name,
        period: {
          from: exp.period.from,
          to: exp.period.to,
          form: new FormGroup({
            start: new FormControl(exp.period.from),
            end: new FormControl(exp.period.to)
          })
        }
      }))
    ] :
      [
        {
          name: '',
          period: {
            from: new Date(),
            to: new Date(),
            form: new FormGroup({
              start: new FormControl(new Date()),
              end: new FormControl(new Date())
            })
          }
        }
      ];
  }

  saveChanges() {
    this.dialogRef.close();
    this.profileService.updateUserProfile({
      _id: this.data.user._id,
      userDetails: {
        headerInfo: this.data.userDetails.headerInfo,
        company: this.data.userDetails.company,
        skills: this.data.userDetails.skills,
        profileDescription: this.data.userDetails.profileDescription,
        experience: this.experience.map(exp => ({
          name: exp.name,
          period: {
            from: exp.period.form.get('start').value,
            to: exp.period.form.get('end').value
          }
        })),
        phone: this.data.userDetails.phone,
        email: this.data.userDetails.email,
      }
    });
  }

  addExperience() {
    this.experience.push({
      name: '',
      period: {
        from: new Date(),
        to: new Date(),
        form: new FormGroup({
          start: new FormControl(new Date()),
          end: new FormControl(new Date())
        })
      }
    });
    console.log(this.experience)
  }

  removeExperience(index: number) {
    this.experience.splice(index, 1);
  }
}