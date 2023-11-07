import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'users-list',
    template: `
        <mat-grid-list cols="2" rowHeight="100px" gutterSize="16px">
            <mat-grid-tile *ngFor="let user of users" (mouseenter)="setHoveredItem(user)" (mouseleave)="setHoveredItem(null)" (click)="navigateToProfile(user._id)">
                <div class="tile-content" [class.item_highlight]="hoveredItem === user">
                <div class="circle-container cursor-pointer">
                    <img src="assets/avatar_placeholder.jpg" alt="Avatar">
                </div>
                <div class="ml-4 cursor-pointer">
                    <div class="text-color" matListItemTitle>{{user.firstName}}</div>
                    <div class="text-color" matListItemLine>{{user.lastName}}</div>
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

export class UsersListComponent implements OnInit {
    @Input() users: UserInfoDto[] = [];
    hoveredItem: any;

    constructor(private router: Router) { }

    ngOnInit() { }

    navigateToProfile(id: string) {
        this.router.navigate(['dashboard', 'profile', id])
    }

    setHoveredItem(offer: any) {
        this.hoveredItem = offer;
    }
}