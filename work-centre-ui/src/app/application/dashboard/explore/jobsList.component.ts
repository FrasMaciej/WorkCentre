import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jobs-list',
  template: `
    <mat-grid-list cols="2" rowHeight="150px" gutterSize="16px">
      <mat-grid-tile *ngFor="let offer of jobs | recursiveFilter: searchText" (mouseenter)="setHoveredItem(offer)" (mouseleave)="setHoveredItem(null)">
        <div class="tile-content" [class.item_highlight]="hoveredItem === offer" (click)="navigateToJob(offer)">
          <div class="flex flex-col gap-y-2">
            <div class="flex">
              <div class="circle-container cursor-pointer">
                <img src="assets/job_placeholder.png" alt="Avatar">
              </div>
              <div class="ml-4 cursor-pointer">
                <div class="text-color" matListItemTitle>{{offer.name}}</div>
                <div class="text-color" matListItemLine>{{offer.details}}</div>
              </div>
            </div>
            <div *ngIf="offer?.location" class="flex justify-items-center gap-x-1">
              <mat-icon>location_on</mat-icon>
              <div class="text-color" matListItemLine>{{offer.location}}</div>
            </div>
            <div *ngIf="offer?.salary" class="flex justify-items-center gap-x-1">
              <mat-icon> attach_money</mat-icon>
              <div class="text-color" matListItemLine>{{offer.salary}}</div>
            </div>
          </div>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styles: [`
    .text-color {
      color: var(--white);
    }

    .circle-container {
      width: 55px;
      height: 55px;
      border-radius: 5%;
      overflow: hidden;
    }

    .item_highlight {
      background-color: gray;
      color: var(--gray) !important;
    }

    .tile-content {
      display: flex;
      align-items: center;
      padding: 16px;
      border: 1px solid white;
      border-radius: 4px;
      cursor: pointer;
      width: 95%;
      height: 150px;
    }
  `]
})

export class JobsListComponent {
  @Input() jobs: any;
  @Input() searchText: string;
  hoveredItem: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setHoveredItem(offer: any) {
    this.hoveredItem = offer;
  }

  navigateToJob(offer) {
    this.router.navigate(['dashboard', 'job', offer._id])
  }
}