import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobsService } from './jobs.service';

@Component({
    selector: 'add-offer-modal',
    template: `
        <div class="modal-content p-14" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <form (ngSubmit)="addJobOffer()" #dateRangeForm="ngForm"> 
                    <div class="modal-header">
                        <h5 class="modal-title">Add Job Offer</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Title" name="name" [(ngModel)]="jobOfferForm.name" required>
                            </mat-form-field>
                        </div>
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Details" name="details" [(ngModel)]="jobOfferForm.details" required>
                            </mat-form-field>
                        </div>
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Company" name="company" [(ngModel)]="jobOfferForm.company" required>
                            </mat-form-field>
                        </div>
                        <mat-form-field>
                            <mat-label>Enter a date range</mat-label>
                            <mat-date-range-input [rangePicker]="picker" [formGroup]="jobOfferForm?.dateForm">
                            <input matStartDate formControlName="start" placeholder="Start Date" >
                            <input matEndDate formControlName="end" placeholder="End Date">
                            </mat-date-range-input>
                            <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                            <mat-date-range-picker #picker></mat-date-range-picker>
                        </mat-form-field>
                        </div>
                        <div class="modal-footer">
                        <button type="button" mat-button color="warn" (click)="closeModal()">Close</button>
                        <button type="submit" mat-button color="primary" [disabled]="jobOfferForm.invalid">Add Job Offer</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    `,
    styles: [`
        mat-form-field {
            ::ng-deep {
                width: 260px;
            }
        }
    `]
})

export class AddOfferModalComponent {
    jobOfferForm: any;
    user: any;

    constructor(
        public dialogRef: MatDialogRef<AddOfferModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private jobsService: JobsService
    ) {
        this.user = this.data.user;
        this.jobOfferForm = {
            name: '',
            company: '',
            details: '',
            dateForm: new FormGroup({
                start: new FormControl(new Date()),
                end: new FormControl(new Date())
            })
        };
    }

    async addJobOffer() {
        try {
            this.dialogRef.close();
            await this.jobsService.addJob({
                name: this.jobOfferForm.name,
                company: this.jobOfferForm.company,
                details: this.jobOfferForm.details,
                dateFrom: this.jobOfferForm.dateForm.get('start').value,
                dateTo: this.jobOfferForm.dateForm.get('end').value,
                applicants: 0
            });
            const jobs = await this.jobsService.getJobs();
            console.log(jobs);
            this.jobsService.setData(jobs);
        } catch (err) {
            console.error(err);
        }
    }

    closeModal() {
        this.dialogRef.close();
    }


}