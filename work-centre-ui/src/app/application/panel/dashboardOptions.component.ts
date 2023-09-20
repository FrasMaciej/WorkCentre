import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-options',
    template: `
        <div class="flex flex-col justify-center items-start gap-y-7 pl-4 text-gray ">
            <button class="flex gap-x-3 items-center">
                <mat-icon class="icon-display">home</mat-icon> 
                <div>Home</div>
            </button>
            <button class="flex gap-x-3 items-center">
                <mat-icon class="icon-display">explore</mat-icon>
                <div>Explore</div>
            </button>
            <button class="flex gap-x-3 items-center">
                <mat-icon class="icon-display">notifications_none</mat-icon>
                <div>Notifications</div>
            </button>
            <button class="flex gap-x-3 items-center">
                <mat-icon class="icon-display">mail_outline</mat-icon>
                <div>Conversation</div>
            </button>
            <button class="flex gap-x-3 items-center">
                <mat-icon class="icon-display">person_outline</mat-icon>
                <div>Profile</div>
            </button>
        </div>
    `
})

export class DashboardOptionsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}