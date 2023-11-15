import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../home/jobs.service';
import { ConfirmationDialog } from 'src/app/library/confirmationModal/confirmationDialog.component';

@Component({
  selector: 'candidates-modal',
  template: `
<div class="p-4 modal-container">
  <div class="flex flex-row justify-between">
    <div class="text-2xl font-bold mb-6">Applicants for the Job Offer</div>
    <button mat-raised-button color="accent" class="custom-button" (click)="findBestCandidate()">
      <div class="flex flex-row gap-x-1"> 
        <img class="custom-svg-color" src="assets/logo/chatgpt.svg"/>
        <div>Choose best candidate with AI</div>
      </div>
    </button>
  </div>
  <div *ngIf="openAiRequestLoading === true" class="flex justify-center mb-4">
    <mat-progress-spinner
      class="example-margin"
      mode="indeterminate"
      color="accent">
    </mat-progress-spinner>
  </div>
  <div *ngIf="bestCandidate" class="mb-8 border p-4 rounded-md shadow-lg bg-gray-200 flex flex-col gap-y-2">
    <div class="text-blue-500">Best Candidate Found with AI is:</div>
    <candidate-list-item [candidate]="bestCandidate" [editStateEnabled]="false"></candidate-list-item>
  </div>

  <div *ngFor="let candidate of candidates" class="mb-8 border p-4 rounded-md shadow-lg">
    <candidate-list-item [candidate]="candidate" [data]="data" [editStateEnabled]="true"></candidate-list-item>
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

      .custom-button {
        height: 50px
      }

      .custom-svg-color {
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(350deg) brightness(101%) contrast(101%);
      }
    `,
  ],
})
export class CandidatesModalComponent implements OnInit {
  candidates: UserDetailsDto[] = [];
  bestCandidate;
  confirmationDialog: MatDialogRef<ConfirmationDialog>;
  openAiRequestLoading = false;

  constructor(
    public dialogRef: MatDialogRef<CandidatesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobsService: JobsService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.candidates = await this.jobsService.getJobOfferApplicants(this.data.offerId);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  async getApplicants() {
    this.candidates = await this.jobsService.getJobOfferApplicants(this.data.offerId);
  }

  findBestCandidate() {
    this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false,
      width: "500px",
      data: {
        type: 'warning'
      }
    });
    this.confirmationDialog.componentInstance.confirmMessage = "Are you sure you want to find best matching candidate with AI usage? Remember that Artiffical Inelligence choice is only a suggestion and it should not be the only factor responsible for choosing candidates.";

    this.confirmationDialog.afterClosed().subscribe(async result => {
      if (result) {
        this.openAiRequestLoading = true;
        const response = await this.jobsService.getBestCandidates({
          offer: this.data.jobOffer,
          candidates: this.candidates
        });
        this.bestCandidate = response;
        this.openAiRequestLoading = false;
      }
    });
  }

}