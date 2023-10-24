import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
                        <input matInput placeholder="Title" required>
                        </mat-form-field>
                    </div>
                    <div class="form-group">
                        <mat-form-field>
                        <input matInput placeholder="Company" required>
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
                    <button type="button" mat-button color="warn" >Close</button>
                    <button type="submit" mat-button color="primary" [disabled]="jobOfferForm.invalid">Add Job Offer</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    `
})

export class AddOfferModalComponent implements OnInit {
    userJobOffers = [
        { title: 'Software Engineer', company: 'Tech Co.', applicants: 5, startDate: new Date().setMonth(6), endDate: new Date().setMonth(8), applicationHistory: [] },
        { title: 'UX Designer', company: 'Design Studio', applicants: 8, startDate: new Date(), endDate: new Date(), applicationHistory: [] },
    ];
    jobOfferForm: any;
    newJobOffer: any = {};
    user: any;

    constructor(
        public dialogRef: MatDialogRef<AddOfferModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.user = this.data.user;
        this.jobOfferForm = {
            title: ['', Validators.required],
            company: ['', Validators.required],
            dateForm: new FormGroup({
                start: new FormControl(new Date()),
                end: new FormControl(new Date())
            })
        };
    }

    ngOnInit() { }

    addJobOffer() {
        this.userJobOffers.push({
            title: this.newJobOffer.title,
            company: this.newJobOffer.company,
            startDate: this.newJobOffer.startDate,
            endDate: this.newJobOffer.endDate,
            applicants: 0,
            applicationHistory: []
        });

        this.newJobOffer = {};
    }


}