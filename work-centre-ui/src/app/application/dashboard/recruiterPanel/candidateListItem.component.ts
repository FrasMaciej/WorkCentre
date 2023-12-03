import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobsService } from '../home/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusModalComponent } from './statusModal.component';

@Component({
    selector: 'candidate-list-item',
    template: `
        <div class="flex justify-items-center mb-4">
            <mat-icon class="text-gray-600 text-xl">person</mat-icon>
            <h3 class="text-lg font-semibold mr-2">{{ candidate.firstName }} {{ candidate.lastName }}</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <h4 class="text-md font-semibold mb-2">Skills</h4>
            <ul class="list-disc pl-4">
            <li *ngFor="let skill of candidate.skills">{{ skill.name }}</li>
            </ul>
        </div>
            <div>
                <h4 class="text-md font-semibold mb-2">Experience</h4>
                <ul class="list-disc pl-4">
                <li *ngFor="let experience of candidate.experience">
                    {{ experience.name }} - {{ experience.place || 'N/A' }} ({{ experience.period.from | date }} - {{ experience.period.to | date }})
                </li>
                </ul>
            </div>
        </div>
        <div class="mt-4">
            <div class="flex justify-items-center mb-2" *ngIf="candidate?.headerInfo">
                <mat-icon class="text-gray-600 mr-2">info</mat-icon>
                <p>{{ candidate.headerInfo }}</p>
            </div>
            <div class="flex justify-items-center mb-2" *ngIf="candidate?.company">
                <mat-icon class="text-gray-600 mr-2">business</mat-icon>
                <p>{{ candidate.company }}</p>
            </div>
            <div class="flex justify-items-center mb-2" *ngIf="candidate?.profileDescription">
                <mat-icon class="text-gray-600 mr-2 icon-width">description</mat-icon>
                <p>{{ candidate.profileDescription }}</p>
            </div>
            <div class="flex justify-items-center mb-2" *ngIf="candidate?.location">
                <mat-icon class="text-gray-600 mr-2">location_on</mat-icon>
                <p>{{ candidate.location }}</p>
            </div>
            <div class="flex justify-items-center mb-2" *ngIf="candidate?.phone">
                <mat-icon class="text-gray-600 mr-2">phone</mat-icon>
                <p>{{ candidate.phone }}</p>
            </div>
            <div class="flex justify-items-center mb-6" *ngIf="candidate?.email">
                <mat-icon class="text-gray-600 mr-2">email</mat-icon>
                <p>{{ candidate.email }}</p>
            </div>
            <div class="flex justify-items-center mb-4" *ngIf="candidate?.state">
                <div>State: </div>&nbsp;
                <b>{{ getStatus(candidate.state) }}</b>
            </div>
            <div *ngIf="editStateEnabled">
                <button mat-raised-button color="primary" (click)="openModal(candidate)">    
                <mat-icon class="text-white">edit</mat-icon>
                    Edit state
                </button>
            </div>
        </div>
    `,
    styles: [`
        .icon-width {
            width: 40px;
        }
    `]
})

export class CandidateListItemComponent implements OnInit {
    @Input() candidate;
    @Input() data;
    @Input() editStateEnabled = true;
    @Output() onStateChange = new EventEmitter();

    constructor(private jobsService: JobsService, private dialog: MatDialog) { }

    ngOnInit() { }

    getStatus(state: string) {
        return this.jobsService.mapApplicantStatus(state);
    }

    openModal(candidate: UserDetailsDto) {
        const dialogRef = this.dialog.open(StatusModalComponent, {
            width: '400px',
            height: '250px',
            data: {
                currentStatus: candidate.state,
                jobId: this.data.offerId,
                userId: candidate._id
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.onStateChange.emit(true);
        });
    }

}