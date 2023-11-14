import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CandidatesModalComponent } from './candidatesModal.component';

@Component({
    selector: 'offer-details-modal',
    template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Job offer details</h1>
    
    <div class="bg-white p-4 shadow-md container">
        <div>
            <div class="flex items-center mb-4 col-size gap-x-2">
                <mat-icon class="mr-2 text-xl">title</mat-icon>
                <span class="text-lg"><strong>Title:</strong> {{ data.jobOffer.name }}</span>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2">
                <mat-icon class="mr-2 text-xl">business</mat-icon>
                <span class="text-lg"><strong>Company:</strong> {{ data.jobOffer.company }}</span>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2" *ngIf="data.jobOffer.location">
                <mat-icon class="mr-2 text-xl">location_on</mat-icon>
                <span class="text-lg"><strong>Location:</strong> {{ data.jobOffer.location }}</span>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2" *ngIf="data.jobOffer.salary">
                <mat-icon class="mr-2 text-xl">attach_money</mat-icon>
                <span class="text-lg"><strong>Salary:</strong> {{ data.jobOffer.salary }}</span>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2">
                <mat-icon class="mr-2 text-xl">schedule</mat-icon>
                <span class="text-lg"><strong>Recruitment Active:  </strong></span>
                <mat-icon [ngClass]="{'text-green-500': isCurrentDateInRange(data.jobOffer.dateFrom, data.jobOffer.dateTo), 'text-red-500': !isCurrentDateInRange(data.jobOffer.dateFrom, data.jobOffer.dateTo)}">
                {{ isCurrentDateInRange(data.jobOffer.dateFrom, data.jobOffer.dateTo) ? 'check_circle' : 'highlight_off' }}
                </mat-icon>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2">
                <mat-icon class="mr-2 text-xl">people</mat-icon>
                <span class="text-lg"><strong>Applicants:</strong> {{ data.jobOffer.applicants.length }}</span>
                <button mat-stroked-button color="basic" type="button" (click)="openApplicantsModal()">
                    Browse Applicants
                </button>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2">
                <mat-icon class="mr-2 text-xl">event</mat-icon>
                <span class="text-lg"><strong>Start Date:</strong> {{ data.jobOffer.dateFrom | date }}</span>
            </div>
            <div class="flex items-center mb-4 col-size gap-x-2">
                <mat-icon class="mr-2 text-xl">event_busy</mat-icon>
                <span class="text-lg"><strong>End Date:</strong> {{ data.jobOffer.dateTo | date }}</span>
            </div>
        </div>
        <div class="flex justify-end gap-x-4">
            <button mat-stroked-button color="basic" type="button" (click)="closeModal()">
                Cancel
            </button>
        </div>
    </div>
  `,
    styles: [`
        .col-size {
            height: 25px;
        }

        .container {
            width: 500px;
            height: 500px;
        }
    `]
})
export class OfferDetailsModalComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<OfferDetailsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog
    ) { }

    ngOnInit() { }

    isCurrentDateInRange(startDate: Date, endDate: Date): boolean {
        const currentDate = new Date().getTime();
        return startDate && endDate ? new Date(startDate)?.getTime() <= currentDate && currentDate <= new Date(endDate)?.getTime() : false;
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    openApplicantsModal(): void {
        const dialogRef = this.dialog.open(CandidatesModalComponent, {
            width: '600px',
            height: '700px',
            data: {
                offerId: this.data.jobOffer._id
            },
        });
    }
}