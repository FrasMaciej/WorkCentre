import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobsService } from './jobs.service';
import { OrganizationsService } from './organizations.service';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'add-offer-modal',
    template: `
        <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Add new job offer</h1>
        <div class="p-8" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <form (ngSubmit)="addJobOffer()" [formGroup]="jobOfferForm" class="modal-content"> 
                    <div class="mb-10 gap-y-2">
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
                                <input matInput placeholder="Salary" formControlName="salary">
                            </mat-form-field>
                        </div>
                        <div class="form-group">
                            <mat-form-field>
                                <input matInput placeholder="Location" formControlName="location">
                                <mat-error *ngIf="jobOfferForm.get('details').hasError('required')">Location is required</mat-error>
                            </mat-form-field>
                        </div>
                        <div class="form-group">
                            <mat-form-field>
                                <mat-select formControlName="company" placeholder="Company" #singleSelect>
                                    <mat-option>
                                        <ngx-mat-select-search ngx-mat-select-search [formControl]="jobOfferForm['companyFilter']"></ngx-mat-select-search>
                                    </mat-option>
                                    <mat-option *ngFor="let org of filteredCompanys | async" [value]="org.name">{{org.name}}</mat-option>
                                </mat-select>
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
                    <div class="modal-footer gap-x-4">
                        <button type="button" mat-stroked-button color="basic" (click)="closeModal()">Close</button>
                        <button type="submit" mat-raised-button color="primary" [disabled]="jobOfferForm.invalid">Add Job Offer</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    styles: [`
        mat-form-field {
            ::ng-deep {
                width: 100%;
            }
        }

        .modal-content {
            width: 500px;
            height: 525px;
        }
        
    `]
})

export class AddOfferModalComponent implements OnInit {
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    jobOfferForm: FormGroup;
    user: any;
    organizations;
    filteredCompanys: ReplaySubject<OrganizationDto[]> = new ReplaySubject<OrganizationDto[]>(1);
    protected _onDestroy = new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<AddOfferModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private jobsService: JobsService,
        private orgsService: OrganizationsService
    ) {
        this.user = this.data.user;
        this.jobOfferForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            salary: new FormControl(''),
            location: new FormControl('', [Validators.required]),
            company: new FormControl('', [Validators.required]),
            companyFilter: new FormControl(''),
            details: new FormControl('', [Validators.required]),
            dateForm: new FormGroup({
                start: new FormControl([Validators.required]),
                end: new FormControl([Validators.required])
            })
        });
    }

    async ngOnInit() {
        await this.getOrgs();
        this.filteredCompanys.next(this.organizations.slice());

        this.jobOfferForm.setValidators([
            Validators.required,
            this.dateRangeValidator
        ]);
        this.jobOfferForm.get('companyFilter').valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCompanys();
            });
    }

    ngAfterViewInit() {
        this.setInitialValue();
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    protected setInitialValue() {
        this.filteredCompanys
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(() => {
                this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
            });
    }

    protected filterCompanys() {
        if (!this.organizations) {
            return;
        }
        let search = this.jobOfferForm['companyFilter'].value;
        if (!search) {
            this.filteredCompanys.next(this.organizations.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredCompanys.next(
            this.organizations.filter(org => org.name.toLowerCase().indexOf(search) > -1)
        );
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
                    salary: this.jobOfferForm.get('salary').value,
                    location: this.jobOfferForm.get('location').value,
                    applicants: [],
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

    async getOrgs() {
        this.organizations = await this.orgsService.getOrganizations();
    }
}