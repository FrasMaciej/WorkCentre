import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddOfferModalComponent } from '../home/addOfferModal.component';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';
import { ProfileService } from '../profile/profile.service';
import { AddOrganizationModalComponent } from '../home/addOrganizationModal.component';
import { JobsService } from '../home/jobs.service';
import { ConfirmationDialog } from 'src/app/library/confirmationModal/confirmationDialog.component';
import { Subscription } from 'rxjs';
import { OrganizationsService } from '../home/organizations.service';
import { OfferDetailsModalComponent } from './offerDetailsModal.component';

@Component({
  selector: 'recruiter-panel',
  template: `
    <div class="container mx-auto my-8 text-white">
      <div class="flex gap-x-4">
        <button mat-raised-button color="accent" (click)="openAddJobModal()">
            <mat-icon>work</mat-icon>
            Add Job Offer
        </button>
        <button mat-raised-button color="accent" (click)="openAddOrganizationModal()">
            <mat-icon>business_center</mat-icon>
            Add Organization
        </button>
      </div>

      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-2">Your Job Offers</h2>
        <mat-table [dataSource]="userJobOffers">
          <ng-container matColumnDef="statusIcon">
            <mat-header-cell *matHeaderCellDef>Recruitment Active?</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-icon [ngClass]="{'text-green-500': isCurrentDateInRange(element.dateFrom, element.dateTo), 'text-red-500': !isCurrentDateInRange(element.dateFrom, element.dateTo)}">
                {{ isCurrentDateInRange(element.dateFrom, element.dateTo) ? 'check_circle' : 'highlight_off' }}
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
            <mat-cell *matCellDef="let element">{{ element.applicantsIds.length }}</mat-cell>
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
        <h2 class="text-2xl font-bold mb-2">Your Organizations</h2>
        <mat-table [dataSource]="userOrganizations">
          <ng-container matColumnDef="name"> 
            <mat-header-cell *matHeaderCellDef>name</mat-header-cell>
            <mat-cell *matCellDef="let element">
              {{ element.name }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="description">
            <mat-header-cell *matHeaderCellDef>description</mat-header-cell>
            <mat-cell *matCellDef="let element">
              {{ element.description }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef></mat-header-cell>
            <mat-cell *matCellDef="let element" class="flex items-center justify-end space-x-2">
              <button mat-icon-button (click)="removeOrg(element)">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="['name', 'description', 'actions']"></mat-header-row>
          <mat-row *matRowDef="let row; columns: ['name', 'description', 'actions']"></mat-row>
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
  styles: [`
        mat-table {
            width: 100%;
            margin-top: 1rem;
            border-radius: 16px;
            overflow:hidden !important;
        }

        button{
            border-radius: 18px;
        }

        .status-icon {
            margin-right: 8px;
            font-size: 18px;
        }

        .mat-column-statusIcon {
            flex: 0 0 10%;
        }
    `]
})

export class RecruiterPanelComponent implements OnInit {
  confirmationDialog: MatDialogRef<ConfirmationDialog>;
  isAddJobModalOpen: boolean = false;
  selectedOffer: any;
  newJobOffer: any = {};
  jobOfferForm: any;
  user: any;

  userJobOffers = [];
  userOrganizations = [];
  subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog, private userContext: LoggedUserService, private profileService: ProfileService,
    private jobsService: JobsService, private organizationsService: OrganizationsService
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
    this.getOwnedJobsOrganizations();
    this.subscriptions.add(
      this.jobsService.data.subscribe(res => {
        if (!!res) {
          this.getOwnedJobsOrganizations();
        }
      })
    );
    this.subscriptions.add(
      this.organizationsService.data.subscribe(res => {
        if (!!res) {
          this.getOwnedJobsOrganizations();
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
    try {
      const dialogRef = this.dialog.open(OfferDetailsModalComponent, {
        data: { user: { ...this.user }, jobOffer: offer }
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   this.getUserData();
      // });
    } catch (err) {
      console.error(err);
    }
  }

  cancelOffer(offer: any) {
    this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false,
      data: {
        type: 'warning'
      }
    });
    this.confirmationDialog.componentInstance.confirmMessage = "Are you sure you want to delete job offer?";

    this.confirmationDialog.afterClosed().subscribe(async result => {
      if (result) {
        await this.jobsService.removeJob(offer._id);
        this.getOwnedJobsOrganizations();
      }
    });
  }

  isCurrentDateInRange(startDate: Date, endDate: Date): boolean {
    const currentDate = new Date().getTime();

    if (startDate && endDate) return new Date(startDate)?.getTime() <= currentDate && currentDate <= new Date(endDate)?.getTime()
    else return false;
  }

  async removeOrg(org) {
    this.confirmationDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false,
      data: {
        type: 'warning'
      }
    });
    this.confirmationDialog.componentInstance.confirmMessage = "Are you sure you want to delete organization?";

    this.confirmationDialog.afterClosed().subscribe(async result => {
      if (result) {
        await this.organizationsService.removeOrganization(org._id);
        this.getOwnedJobsOrganizations();
      }
    });
  }

  async getOwnedJobsOrganizations() {
    const userId = this.userContext.id;
    try {
      if (userId) {
        const user = await this.profileService.getUserDetails(userId);
        this.userJobOffers = await this.jobsService.getJobsAuthor();
        this.userOrganizations = await this.organizationsService.getOrganizationsOwner();
        this.user = user.primary;
      }
    } catch (err) {
      console.error(err);
    }
  }
}