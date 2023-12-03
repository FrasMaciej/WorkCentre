import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'organizations-list',
    template: `
        <mat-grid-list cols="2" rowHeight="100px" gutterSize="16px">
            <mat-grid-tile *ngFor="let org of organizations | recursiveFilter: searchText; 
            let last = last" (mouseenter)="setHoveredItem(org)" (mouseleave)="setHoveredItem(null)">
                <div class="tile-content" [class.item_highlight]="hoveredItem === org">
                    <div class="circle-container cursor-pointer">
                        <img src="assets/company_placeholder.png" alt="Avatar">
                    </div>
                    <div class="ml-4 cursor-pointer">
                        <div class="text-color" matListItemTitle>{{org.name}}</div>
                        <div class="text-color" matListItemLine>{{org.description}}</div>
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
        }
    `]
})

export class OrganizationsListComponent implements OnInit {
    @Input() organizations: any;
    @Input() searchText: string;
    hoveredItem: any;

    constructor() { }

    ngOnInit() {
    }

    setHoveredItem(offer: any) {
        this.hoveredItem = offer;
    }
}