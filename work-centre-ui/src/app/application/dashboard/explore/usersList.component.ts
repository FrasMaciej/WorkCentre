import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'users-list',
    template: `
    <mat-list-item *ngFor="let user of users" class="item_highlight cursor-pointer"> 
        <div class="flex flex-row items-center size" (click)="navigateToProfile(user._id)">
            <div class="circle-container cursor-pointer">
                <img src="assets/avatar_placeholder.jpg" alt="Avatar">
            </div>
            <div class="ml-4 cursor-pointer">
                <div class="text-color" matListItemTitle>{{user.firstName}}</div>
                <div class="text-color" matListItemLine>{{user.lastName}}</div>
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

        .item_highlight:hover{
            background-color: gray;
            color: var(--gray) !important;
        }
        
        .size {
            height: 60px;
            padding-bottom: 18px;
        }
    `]
})

export class UsersListComponent implements OnInit {
    @Input() users: UserInfoDto[] = [];

    constructor(private router: Router) { }

    ngOnInit() { }

    navigateToProfile(id: string) {
        this.router.navigate(['dashboard', 'profile', id])
    }
}