import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationsService } from './organizations.service';

@Component({
    selector: 'add-organization-modal',
    template: `
        <div class="modal-content p-14" tabindex="-1" role="dialog">
            <div role="document">
                <form (ngSubmit)="addOrganization()" #dateRangeForm="ngForm"> 
                    <div class="modal-header">
                        <h5 class="modal-title">Add Organization</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group flex flex-col gap-y-1">
                            <mat-form-field>
                                <input matInput placeholder="Name" name="name" [(ngModel)]="organizationForm.name" required>
                            </mat-form-field>
                            <mat-form-field>
                                <input matInput placeholder="Description" name="description" [(ngModel)]="organizationForm.description" required>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" mat-button color="warn" (click)="closeModal()">Close</button>
                        <button type="submit" mat-button color="primary">Add Organization</button>
                    </div>
                </form>
            </div>
        </div>
    `
})

export class AddOrganizationModalComponent {
    organizationForm: AddOrganizationDto;
    newJobOffer: any = {};

    constructor(
        public dialogRef: MatDialogRef<AddOrganizationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private organizationsService: OrganizationsService
    ) {
        this.organizationForm = {
            name: '',
            description: ''
        };
    }

    closeModal() {
        this.dialogRef.close();
    }

    async addOrganization() {
        await this.organizationsService.addOrganization({
            name: this.organizationForm.name,
            description: this.organizationForm.description
        });
        this.dialogRef.close();
    }

}