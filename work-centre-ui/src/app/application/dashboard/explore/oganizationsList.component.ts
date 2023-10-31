import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'organizations-list',
    template: `
        <mat-list-item *ngFor="let org of organizations; let last = last" [class.mat-list-item-divider]="!last">
            <div class="flex flex-row size items-center" [class.item_highlight]="hoveredItem === org">
                <div class="circle-container cursor-pointer">
                    <img src="assets/company_placeholder.png" alt="Avatar">
                </div>
                <div class="ml-4 cursor-pointer">
                    <div class="text-color" matListItemTitle>{{org.name}}</div>
                    <div class="text-color" matListItemLine>{{org.description}}</div>
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

export class OrganizationsListComponent implements OnInit {
    @Input() organizations: any;
    hoveredItem: any;

    constructor() { }

    ngOnInit() {
    }

    setHoveredItem(offer: any) {
        this.hoveredItem = offer;
    }
}