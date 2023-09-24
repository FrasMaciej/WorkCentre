import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'profile',
    template: `
        <div class="ml-4 flex flex-col gap-y-1" *ngIf="dataLoaded">
            <div class="flex">
                <div class="cell-size">Email:  </div>
                <span>{{user.email}}</span>
            </div>
            <div class="flex">
                <div class="cell-size">Name:  </div>
                <span>{{user.firstName}}</span>
            </div>
            <div class="flex">
                <div class="cell-size">Surname:  </div>
                <span>{{user.lastName}}</span>
            </div>
            <div class="mt-2">
                <button mat-flat-button color="warn" >Change Password</button>
            </div>
        </div>
    `,
    styles: [`
        .cell-size {
            height: 25px;
            width: 80px;
        }
    `]
})

export class ProfileComponent implements OnInit {
    user!: UserInfoDto;
    email: string = '';
    dataLoaded = false;
    constructor() {
    }

    ngOnInit() {
        const user = localStorage['userInfo'];
        this.user = JSON.parse(user).local;

        this.dataLoaded = true;
    }
}