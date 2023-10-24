import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'add-organization-modal',
    template: `
        <div class="modal-content p-14" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <form (ngSubmit)="addOrganization()" #dateRangeForm="ngForm"> 
                    <div class="modal-header">
                    <h5 class="modal-title">Add Job Offer</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <mat-form-field>
                            <input matInput placeholder="Name" required>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" mat-button color="warn" >Close</button>
                    <button type="submit" mat-button color="primary" [disabled]="jobOfferForm.invalid">Add Organization</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    `
})

export class AddOrganizationModalComponent implements OnInit {
    jobOfferForm: any;
    newJobOffer: any = {};
    user: any;

    constructor(
        public dialogRef: MatDialogRef<AddOrganizationModalComponent>,
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

    addOrganization() {
        
    }

    ngOnInit() { }

}