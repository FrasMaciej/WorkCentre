import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jobs-list',
    template: `
        <mat-list-item *ngFor="let offer of jobs; let last = last" [class.mat-list-item-divider]="!last">
            <div class="flex flex-row size items-center" [class.item_highlight]="hoveredItem === offer">
                <div class="circle-container cursor-pointer">
                    <img src="assets/job_placeholder.png" alt="Avatar">
                </div>
                <div class="ml-4 cursor-pointer">
                    <div class="text-color" matListItemTitle>{{offer.name}}</div>
                    <div class="text-color" matListItemLine>{{offer.details}}</div>
                </div>
            </div>
        </mat-list-item>
    `,
    styles: [`
        .text-color {
            color: var(--white);
        }

        .circle-container {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            overflow: hidden;
        }

        .item_highlight:hover {
            background-color: gray;
            color: var(--gray) !important;
        }

        .size {
            height: 60px;
            padding-bottom: 18px;
        }
        .mat-list-item-divider {
            border-bottom: 1px solid gray;
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