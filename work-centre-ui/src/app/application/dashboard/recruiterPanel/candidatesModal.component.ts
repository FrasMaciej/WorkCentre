import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../home/jobs.service';
import { StatusModalComponent } from './statusModal.component';

@Component({
  selector: 'candidates-modal',
  template: `
<div class="p-4 modal-container">

<h2 class="text-2xl font-bold mb-6">Applicants for the Job Offer</h2>

<div *ngFor="let candidate of candidates" class="mb-8 border p-4 rounded-md shadow-lg">

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
    <div class="flex justify-items-center mb-2">
      <mat-icon class="text-gray-600 mr-2">info</mat-icon>
      <p>{{ candidate.headerInfo }}</p>
    </div>
    <div class="flex justify-items-center mb-2">
      <mat-icon class="text-gray-600 mr-2">business</mat-icon>
      <p>{{ candidate.company }}</p>
    </div>
    <div class="flex justify-items-center mb-2">
      <mat-icon class="text-gray-600 mr-2">description</mat-icon>
      <p>{{ candidate.profileDescription }}</p>
    </div>
    <div class="flex justify-items-center mb-2">
      <mat-icon class="text-gray-600 mr-2">phone</mat-icon>
      <p>{{ candidate.phone }}</p>
    </div>
    <div class="flex justify-items-center mb-6">
      <mat-icon class="text-gray-600 mr-2">email</mat-icon>
      <p>{{ candidate.email }}</p>
    </div>
    <div class="flex justify-items-center mb-4">
      <div>State: </div>&nbsp;
      <b>{{ getStatus(candidate.state) }}</b>
    </div>
    <div>
      <button mat-raised-button color="primary" (click)="openModal(candidate)">    
        <mat-icon class="text-white">edit</mat-icon>
        Edit state
      </button>
    </div>
  </div>

</div>

<div class="flex justify-end">
  <button mat-raised-button (click)="closeModal()">
    Close
  </button>
</div>

</div>
  `,
  styles: [
    `
      .modal-container {
        max-height: 700px; 
        overflow-y: scroll;
      }
    `,
  ],
})
export class CandidatesModalComponent implements OnInit {
  candidates: UserDetailsDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<CandidatesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobsService: JobsService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.candidates = await this.jobsService.getJobOfferApplicants(this.data.offerId);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

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
      this.getApplicants();
    });
  }

  async getApplicants() {
    this.candidates = await this.jobsService.getJobOfferApplicants(this.data.offerId);

  }
}