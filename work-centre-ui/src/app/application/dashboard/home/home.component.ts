import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';
import { ProfileService } from '../profile/profile.service';
import { JobsService } from './jobs.service';
import { ConfirmationDialog } from 'src/app/library/confirmationModal/confirmationDialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'home',
  template: `
    <div class="container mx-auto my-8 text-white">
      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-2">Job Offers Applied</h2>
        <mat-table [dataSource]="appliedJobOffers">
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
              <button mat-icon-button (click)="navToDetails(element._id)">
                <mat-icon>receipt</mat-icon>
              </button>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="['statusIcon', 'title', 'company', 'applicants', 'startDate', 'endDate', 'actions']"></mat-header-row>
          <mat-row *matRowDef="let row; columns: ['statusIcon', 'title', 'company', 'applicants', 'startDate', 'endDate', 'actions']"></mat-row>
        </mat-table>
      </div>
    </div>
  `,
  styles: [
    `
      mat-table {
        width: 100%;
        margin-top: 1rem;
        border-radius: 16px;
        overflow:hidden !important;
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

  appliedJobOffers = [];
  subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog, private userContext: LoggedUserService, private profileService: ProfileService,
    private jobsService: JobsService, private router: Router
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
    this.getAppliedJobOffers();
    this.subscriptions.add(
      this.jobsService.data.subscribe(res => {
        if (!!res) {
          this.getAppliedJobOffers();
        }
      })
    );
  }

  isCurrentDateInRange(startDate: Date, endDate: Date): boolean {
    const currentDate = new Date().getTime();

    if (startDate && endDate) return new Date(startDate)?.getTime() <= currentDate && currentDate <= new Date(endDate)?.getTime()
    else return false;
  }

  async getAppliedJobOffers() {
    this.appliedJobOffers = await this.jobsService.getAppliedJobOffers();
    console.log(this.appliedJobOffers);
  }

  navToDetails(id) {
    this.router.navigate(['dashboard', 'job', id])
  }

}

