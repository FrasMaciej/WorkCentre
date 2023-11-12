import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../home/jobs.service';
import { ConfirmationDialog } from 'src/app/library/confirmationModal/confirmationDialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Component({
    selector: 'job-page',
    template: `
        <div class="container mx-auto mt-8" *ngIf="jobOffer">
            <div class="bg-gray-800 text-white p-6 rounded shadow-md">
                <div class="flex flex-col mb-4 gap-y-2">
                    <div class="text-lg font-semibold flex items-center gap-x-3">
                        <mat-icon>work</mat-icon> 
                        Role
                    </div>
                    <p class="text-xl">{{ jobOffer.name }}</p>
                </div>

                <div class="flex flex-col mb-4 gap-y-2">
                    <div class="text-lg font-semibold flex items-center gap-x-3">
                        <mat-icon>business</mat-icon> 
                        Company
                    </div>
                    <p class="text-xl">{{ jobOffer.company }}</p>
                </div>

                <div class="flex flex-col mb-4 gap-y-2">
                    <div class="text-lg font-semibold flex items-center gap-x-3">
                        <mat-icon>schedule</mat-icon> 
                        Recruitment Period
                    </div>
                    <p class="text-base">
                        {{ jobOffer.dateFrom | date}} - {{ jobOffer.dateTo | date}}
                    </p>
                </div>

                <div class="flex flex-col mb-4 gap-y-2">
                    <div class="text-lg font-semibold flex items-center gap-x-3">
                        <mat-icon>description</mat-icon> 
                        Details
                    </div>
                    <p class="text-base">{{ jobOffer.details }}</p>
                </div>

                    <button *ngIf="!alreadyApplied" mat-raised-button color="accent" class="mt-4" (click)="applyForJob()">Apply Now</button>
                    <div *ngIf="alreadyApplied" class="mt-4 flex flex-col gap-x-2">
                        <span>You have already applied for this offer. Wait for recruiter feedback</span>
                        <span>Or you can resign from your application: </span>
                        <button mat-raised-button color="warn" class="mt-4" (click)="resignFromApplication()">Resign</button>
                    </div>
            </div>
        </div>
    `,
    styles: [
        `
            label {
                display: block;
                margin-bottom: 0.5rem;
            }

            p {
                margin-bottom: 1rem;
            }
        `,
    ],
})

export class JobPageComponent implements OnInit {
    confirmationDialog: MatDialogRef<ConfirmationDialog>;
    jobOfferId = '';
    jobOffer: ExtendedJobDto;
    alreadyApplied = false;

    constructor(private route: ActivatedRoute, private jobsService: JobsService, public dialog: MatDialog, private user: LoggedUserService) {
        this.route.queryParams.subscribe((params) => {
            this.jobOfferId = this.route.snapshot.params['id'];
        });
    }

    async ngOnInit() {
        this.jobOffer = await this.jobsService.getJob(this.jobOfferId);
        this.checkIfAlreadyApplied();
    }

    async applyForJob() {
        this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
            disableClose: false,
            data: {
                type: 'confirm'
            }
        });
        this.confirmationDialog.componentInstance.confirmMessage = "Are you sure you want to apply for this job offer?";
        this.confirmationDialog.componentInstance.data.type = "confirm";
        this.confirmationDialog.afterClosed().subscribe(async result => {
            if (result) {
                try {
                    await this.jobsService.applyForJob(this.jobOffer._id)
                    this.jobOffer = await this.jobsService.getJob(this.jobOfferId);
                    this.checkIfAlreadyApplied();
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    checkIfAlreadyApplied() {
        if (this.jobOffer.applicantsIds.includes(this.user.id)) {
            this.alreadyApplied = true;
        } else {
            this.alreadyApplied = false;
        }
    }

    async resignFromApplication() {
        this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
            disableClose: false,
            data: {
                type: 'warning'
            }
        });
        this.confirmationDialog.componentInstance.confirmMessage = "Are you sure you want to resign from, this job offer?";
        this.confirmationDialog.componentInstance.data.type = "confirm";
        this.confirmationDialog.afterClosed().subscribe(async result => {
            if (result) {
                try {
                    await this.jobsService.resignFromJobOffer(this.jobOffer._id)
                    this.jobOffer = await this.jobsService.getJob(this.jobOfferId);
                    this.checkIfAlreadyApplied();
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }
}