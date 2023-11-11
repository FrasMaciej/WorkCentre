import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationsService } from './organizations.service';

@Component({
    selector: 'add-organization-modal',
    template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Add new organization</h1>
    <div class="p-8" tabindex="-1" role="dialog">
      <div role="document">
        <form [formGroup]="organizationForm" (ngSubmit)="addOrganization()" #dateRangeForm="ngForm" class="modal-content flex flex-col justify-between">
            <div class="modal-body">
                <div class="form-group flex flex-col gap-y-1">
                <mat-form-field>
                    <input matInput placeholder="Name" formControlName="name">
                    <mat-error *ngIf="organizationForm.get('name').hasError('required')">
                    Name is required
                    </mat-error>
                </mat-form-field>
                <mat-form-field>
                    <input matInput placeholder="Description" formControlName="description">
                    <mat-error *ngIf="organizationForm.get('description').hasError('required')">
                    Description is required
                    </mat-error>
                </mat-form-field>
            </div>
            </div>
            <div class="modal-footer gap-x-4">
                <button type="button" mat-button color="basic" (click)="closeModal()">Close</button>
                <button type="submit" mat-raised-button color="primary" [disabled]="organizationForm.invalid">Add Organization</button>
            </div>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .modal-content {
        width: 500px;
        height: 300px;
    }
  `]
})
export class AddOrganizationModalComponent {
    organizationForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddOrganizationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private organizationsService: OrganizationsService
    ) {
        this.organizationForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
        });
    }

    closeModal() {
        this.dialogRef.close();
    }

    async addOrganization() {
        if (this.organizationForm.valid) {
            await this.organizationsService.addOrganization({
                name: this.organizationForm.value.name,
                description: this.organizationForm.value.description,
            });
            const orgs = await this.organizationsService.getOrganizationsOwner();
            this.organizationsService.setData(orgs);
            this.dialogRef.close();
        }
    }
}