import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../home/jobs.service';

@Component({
    selector: 'job-page',
    template: `
        <div class="container mx-auto mt-8">
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

                <button mat-raised-button color="accent" class="mt-4" (click)="applyForJob()">Apply Now</button>
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
    jobOfferId = '';
    jobOffer: JobDto;

    constructor(private route: ActivatedRoute, private jobsService: JobsService) {
        this.route.queryParams.subscribe((params) => {
            this.jobOfferId = this.route.snapshot.params['id'];
        });
    }

    async ngOnInit() {
        this.jobOffer = await this.jobsService.getJob(this.jobOfferId);
    }

    applyForJob() {
    }
}