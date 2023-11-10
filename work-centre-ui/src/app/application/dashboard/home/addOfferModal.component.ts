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
                <form (ngSubmit)="addJobOffer()" [formGroup]="jobOfferForm"> 
                    <div class="modal-header">
                        <h5 class="modal-title">Add Job Offer</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Title" formControlName="name">
                                <mat-error *ngIf="jobOfferForm.get('name').hasError('required')">Name is required</mat-error>
                            </mat-form-field>
                        </div>
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Details" formControlName="details">
                                <mat-error *ngIf="jobOfferForm.get('details').hasError('required')">Details are required</mat-error>
                            </mat-form-field>
                        </div>
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Company" formControlName="company">
                                <mat-error *ngIf="jobOfferForm.get('company').hasError('required')">Company is required</mat-error>
                            </mat-form-field>
                        </div>
                        <mat-form-field>
                            <mat-label>Enter a date range</mat-label>
                            <mat-date-range-input [rangePicker]="picker" [formGroup]="getDateForm()">
                            <input matStartDate formControlName="start" placeholder="Start Date" >
                            <input matEndDate formControlName="end" placeholder="End Date">
                            </mat-date-range-input>
                            <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                            <mat-date-range-picker #picker></mat-date-range-picker>
                            <mat-error *ngIf="jobOfferForm.get('dateForm').get('start').hasError('required') || jobOfferForm.get('dateForm').get('end').hasError('required')">Date is required</mat-error>
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

export class AddOfferModalComponent implements OnInit {
    jobOfferForm: FormGroup;
    user: any;

    constructor(
        public dialogRef: MatDialogRef<AddOfferModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private jobsService: JobsService
    ) {
        this.user = this.data.user;
        this.jobOfferForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            company: new FormControl('', [Validators.required]),
            details: new FormControl('', [Validators.required]),
            dateForm: new FormGroup({
                start: new FormControl([Validators.required]),
                end: new FormControl([Validators.required])
            })
        });
    }

    ngOnInit() {
        this.jobOfferForm.setValidators([
            Validators.required,
            this.dateRangeValidator
        ]);
    }

    async addJobOffer() {
        if (this.jobOfferForm.valid) {
            try {
                this.dialogRef.close();
                await this.jobsService.addJob({
                    name: this.jobOfferForm.get('name').value,
                    company: this.jobOfferForm.get('company').value,
                    details: this.jobOfferForm.get('details').value,
                    dateFrom: this.jobOfferForm.get('dateForm.start').value,
                    dateTo: this.jobOfferForm.get('dateForm.end').value,
                    applicants: 0
                });
                const jobs = await this.jobsService.getJobs();
                this.jobsService.setData(jobs);
            } catch (err) {
                console.error(err);
            }
        }
    }

    closeModal() {
        this.dialogRef.close();
    }

    dateRangeValidator(control: FormControl): { [s: string]: boolean } {
        const start = control.get('dateForm.start').value;
        const end = control.get('dateForm.end').value;
        if (start >= end) {
            return { 'invalidDateRange': true };
        }
        return null;
    }

    getDateForm() {
        return this.jobOfferForm.get('dateForm') as FormGroup;
    }
}