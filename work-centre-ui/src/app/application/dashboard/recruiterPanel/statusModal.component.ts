import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../home/jobs.service';

@Component({
    selector: 'status-modal',
    template: `
    <div class="flex flex-col justify-between">
        <div>
            <h2 mat-dialog-title>Select Status</h2>
            <mat-dialog-content>
            <mat-form-field appearance="fill">
                <mat-label>Status</mat-label>
                <mat-select [(value)]="data.currentStatus">
                <mat-option *ngFor="let status of applicantStatuses" [value]="status.id">{{ status.label }}</mat-option>
                </mat-select>
            </mat-form-field>
            </mat-dialog-content>

        </div>
        <div class="flex justify-end">
            <mat-dialog-actions>
                <button mat-stroked-button color="basic" (click)="exitModal()">Cancel</button>
                <button mat-raised-button color="primary" [mat-dialog-close]="data.currentStatus" (click)="confirmStateChange()" cdkFocusInitial>Save</button>
            </mat-dialog-actions>
        </div>
    </div>
    `,
    styles: [`
        mat-form-field {
            width: 100%;
        }
    `]
})

export class StatusModalComponent {
    applicantStatuses = [
        { id: 'default', label: 'Uncategorized' },
        { id: 'inConsideration', label: 'In consideration' },
        { id: 'consideredPositive', label: 'Considered positive' },
        { id: 'consideredNegative', label: 'Considered negative' },
        { id: 'accepted', label: 'Job proposal' },
        { id: 'rejected', label: 'No job proposal' },
    ];

    constructor(
        public dialogRef: MatDialogRef<StatusModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { currentStatus: string, jobId: string, userId: string },
        private jobsService: JobsService
    ) { }

    exitModal(): void {
        this.dialogRef.close();
    }

    async confirmStateChange() {
        await this.jobsService.updateJobState({
            offerId: this.data.jobId,
            workerId: this.data.userId,
            state: this.data.currentStatus
        });
        this.exitModal();
        return true;
    }
}