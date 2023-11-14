import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'users-list',
    template: `
        <mat-grid-list cols="2" rowHeight="150px" gutterSize="16px">
            <mat-grid-tile *ngFor="let user of users" (mouseenter)="setHoveredItem(user)" (mouseleave)="setHoveredItem(null)" (click)="navigateToProfile(user._id)">
                <div class="tile-content rounded-md shadow-lg border" [class.item_highlight]="hoveredItem === user">
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row">
                            <div class="circle-container cursor-pointer">
                                <img src="assets/avatar_placeholder.jpg" alt="Avatar">
                            </div>
                            <div class="ml-4 cursor-pointer ">
                                <div class="text-color" matListItemTitle>{{user.firstName}} {{user.lastName}}</div>
                                <div class="text-color" matListItemLine>{{user.email}}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-items-center gap-x-2 mt-2">
                            <div *ngIf="user?.location" class="flex gap-x-1">
                                <mat-icon>location_on</mat-icon>
                                <div class="text-color" matListItemLine>{{user.location}}</div>
                            </div>
                            <div *ngIf="user?.headerInfo" class="flex gap-x-1">
                                <mat-icon>edit</mat-icon>
                                <div class="text-color" matListItemLine>{{user.headerInfo}}</div>
                            </div>
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

export class UsersListComponent {
    @Input() users: UserDetailsDto[] = [];
    @Input() searchText: string;

    hoveredItem: any;

    constructor(private router: Router) { }

    navigateToProfile(id: string) {
        this.router.navigate(['dashboard', 'profile', id])
    }

    setHoveredItem(offer: any) {
        this.hoveredItem = offer;
    }
}