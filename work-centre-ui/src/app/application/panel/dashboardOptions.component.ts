import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-options',
    template: `
        <div class="flex flex-col justify-center items-start gap-y-7 pl-4 text-gray">
            <button class="flex gap-x-3 items-center" [class.font-color-red]="selectedOption==='home'" (click)="changeSelected('home')">
                <mat-icon class="icon-display">home</mat-icon> 
                <div>Home</div>
             </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="selectedOption==='explore'" (click)="changeSelected('explore')">
                <mat-icon class="icon-display">explore</mat-icon>
                <div>Explore</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="selectedOption==='notifications'" (click)="changeSelected('notifications')">
                <mat-icon class="icon-display">notifications_none</mat-icon>
                <div>Notifications</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="selectedOption==='conversation'" (click)="changeSelected('conversation')">
                <mat-icon class="icon-display">mail_outline</mat-icon>
                <div>Conversation</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="selectedOption==='profile'" (click)="changeSelected('profile')">
                <mat-icon class="icon-display">person_outline</mat-icon>
                <div>Profile</div>
            </button>
        </div>
    `,
    styles: [`
        .font-color-red {
            color: #e84758;
        }

        button:hover {
            color: #e84758;
        }
    `]
})

export class DashboardOptionsComponent implements OnInit {
    selectedOption = 'home';

    constructor() { }

    ngOnInit() { }

    changeSelected(option: string) {
        this.selectedOption = option;
    }
}