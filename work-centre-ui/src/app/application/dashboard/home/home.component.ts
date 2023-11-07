import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddOfferModalComponent } from './addOfferModal.component';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';
import { ProfileService } from '../profile/profile.service';
import { AddOrganizationModalComponent } from './addOrganizationModal.component';
import { JobsService } from './jobs.service';
import { ConfirmationDialog } from 'src/app/library/confirmationModal/confirmationDialog.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'home',
  template: `
    <div class="container mx-auto my-8 text-white">
      <h1 class="text-4xl font-bold mb-4">Home</h1>
      <div class="flex gap-x-4">
        <button mat-raised-button color="primary" (click)="openAddJobModal()">Add Job Offer</button>
        <button mat-raised-button color="primary" (click)="openAddOrganizationModal()">Add Organization</button>
      </div>

      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-2">Your Job Offers</h2>
        <mat-table [dataSource]="userJobOffers">
          <ng-container matColumnDef="statusIcon">
            <mat-header-cell *matHeaderCellDef>Active?</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-icon [ngClass]="{'text-green-500': isCurrentDateInRange(element.startDate, element.endDate), 'text-gray-500': !isCurrentDateInRange(element.startDate, element.endDate)}">
                {{ isCurrentDateInRange(element.startDate, element.endDate) ? 'check_circle' : 'highlight_off' }}
              </mat-icon>
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="title">
            <mat-header-cell *matHeaderCellDef>Title</mat-header-cell>
            <mat-cell *matCellDef="let element">
              {{ element.name }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="company">
            <mat-header-cell *matHeaderCellDef>Company</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.company }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="applicants">
            <mat-header-cell *matHeaderCellDef>Applicants</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.applicants }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="startDate">
            <mat-header-cell *matHeaderCellDef>Start Date</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.dateFrom | date }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="endDate">
            <mat-header-cell *matHeaderCellDef>End Date</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.dateTo | date }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef></mat-header-cell>
            <mat-cell *matCellDef="let element" class="flex items-center justify-end space-x-2">
              <button mat-icon-button (click)="viewOfferStatus(element)">
                <mat-icon>timeline</mat-icon>
              </button>
              <button mat-icon-button (click)="cancelOffer(element)">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="['statusIcon', 'title', 'company', 'applicants', 'startDate', 'endDate', 'actions']"></mat-header-row>
          <mat-row *matRowDef="let row; columns: ['statusIcon', 'title', 'company', 'applicants', 'startDate', 'endDate', 'actions']"></mat-row>
        </mat-table>
      </div>

      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-2">Job Offers Applied</h2>
        <mat-table [dataSource]="appliedJobOffers">
          <ng-container matColumnDef="statusIcon">
            <mat-header-cell *matHeaderCellDef></mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-icon [ngClass]="{'text-green-500': isCurrentDateInRange(element.startDate, element.endDate), 'text-gray-500': !isCurrentDateInRange(element.startDate, element.endDate)}">
                {{ isCurrentDateInRange(element.startDate, element.endDate) ? 'check_circle' : 'highlight_off' }}
              </mat-icon>
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="title">
            <mat-header-cell *matHeaderCellDef>Title</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.title }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="company">
            <mat-header-cell *matHeaderCellDef>Company</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.company }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="applicants">
            <mat-header-cell *matHeaderCellDef>Applicants</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.applicants }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="startDate">
            <mat-header-cell *matHeaderCellDef>Start Date</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.dateFrom | date }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="endDate">
            <mat-header-cell *matHeaderCellDef>End Date</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.dateTo | date }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef></mat-header-cell>
            <mat-cell *matCellDef="let element" class="flex items-center justify-end space-x-2">
              <button mat-icon-button (click)="viewOfferStatus(element)">
                <mat-icon>timeline</mat-icon>
              </button>
              <button mat-icon-button (click)="cancelOffer(element)">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="['statusIcon', 'title', 'company', 'applicants', 'startDate', 'endDate', 'actions']"></mat-header-row>
          <mat-row *matRowDef="let row; columns: ['statusIcon', 'title', 'company', 'applicants', 'startDate', 'endDate', 'actions']"></mat-row>
        </mat-table>
      </div>

      <div class="mt-6" *ngIf="selectedOffer">
        <h2 class="text-2xl font-bold mb-2">Application History for {{ selectedOffer.title }}</h2>
        <mat-table [dataSource]="selectedOffer.applicationHistory">
          <ng-container matColumnDef="date">
            <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.date }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="status">
            <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.status }}</mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="['date', 'status']"></mat-header-row>
          <mat-row *matRowDef="let row; columns: ['date', 'status']"></mat-row>
        </mat-table>
      </div>
    </div>
  `,
  styles: [
    `
      mat-table {
        width: 100%;
        margin-top: 1rem;
      }
      .status-icon {
        margin-right: 8px;
        font-size: 18px;
      }

      .mat-column-statusIcon {
        flex: 0 0 10%;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  confirmationDialog: MatDialogRef<ConfirmationDialog>;
  isAddJobModalOpen: boolean = false;
  selectedOffer: any;
  newJobOffer: any = {};
  jobOfferForm: any;
  user: any;

  userJobOffers = [];
  appliedJobOffers = [];
  subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog, private userContext: LoggedUserService, private profileService: ProfileService,
    private jobsService: JobsService
  ) {

    this.jobOfferForm = {
      title: ['', Validators.required],
      company: ['', Validators.required],
      dateForm: new FormGroup({
        start: new FormControl(new Date()),
        end: new FormControl(new Date())
      })
    };
  }

  async ngOnInit() {
    this.getOwnedJobs();
    this.subscriptions.add(
      this.jobsService.data.subscribe(res => {
        if (!!res) {
          this.getOwnedJobs();
        }
      })
    );
  }

  openAddJobModal() {
    try {
      this.dialog.open(AddOfferModalComponent, {
        data: {
          user: { ...this.user },
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  openAddOrganizationModal() {
    try {
      this.dialog.open(AddOrganizationModalComponent, {
        data: {
          user: { ...this.user },
        }
      });
    } catch (err) {
      console.error(err);
    }
  }


  viewOfferStatus(offer: any) {
  }

  cancelOffer(offer: any) {
    this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmationDialog.componentInstance.confirmMessage = "Are you sure you want to delete organization?";

    this.confirmationDialog.afterClosed().subscribe(async result => {
      if (result) {
        await this.jobsService.removeJob(offer._id);
        this.getOwnedJobs();
      }
    });
  }

  isCurrentDateInRange(startDate: Date, endDate: Date): boolean {
    const currentDate = new Date();
    return startDate <= currentDate && currentDate <= endDate;
  }

  async getOwnedJobs() {
    const userId = this.userContext.id;
    try {
      if (userId) {
        const user = await this.profileService.getUserDetails(userId);
        const jobsAuthor = await this.jobsService.getJobsAuthor();
        this.userJobOffers = jobsAuthor;
        this.user = user.primary;
      }
    } catch (err) {
      console.error(err);
    }
  }

}