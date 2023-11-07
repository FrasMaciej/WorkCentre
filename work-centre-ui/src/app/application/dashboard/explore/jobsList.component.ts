import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jobs-list',
  template: `
    <mat-grid-list cols="2" rowHeight="100px" gutterSize="16px">
      <mat-grid-tile *ngFor="let offer of jobs" (mouseenter)="setHoveredItem(offer)" (mouseleave)="setHoveredItem(null)">
        <div class="tile-content" [class.item_highlight]="hoveredItem === offer">
          <div class="circle-container cursor-pointer">
            <img src="assets/job_placeholder.png" alt="Avatar">
          </div>
          <div class="ml-4 cursor-pointer">
            <div class="text-color" matListItemTitle>{{offer.name}}</div>
            <div class="text-color" matListItemLine>{{offer.details}}</div>
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
      border: 1px solid gray;
      border-radius: 4px;
      cursor: pointer;
      width: 95%;
    }
  `]
})

export class JobsListComponent implements OnInit {
  @Input() jobs: any;
  hoveredItem: any;

  constructor() { }

  ngOnInit() { }

  setHoveredItem(offer: any) {
    this.hoveredItem = offer;
  }
}