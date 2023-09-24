import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'dashboard-options',
    template: `
        <div class="flex flex-col justify-center items-start gap-y-7 pl-4 text-gray">
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='home'" (click)="changeSelected('home')" routerLink="home">
                <mat-icon class="icon-display">home</mat-icon> 
                <div>Home</div>
             </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='explore'" (click)="changeSelected('explore')" routerLink="explore">
                <mat-icon class="icon-display">explore</mat-icon>
                <div>Explore</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='notifications'" (click)="changeSelected('notifications')" routerLink="notifications">
                <mat-icon class="icon-display">notifications_none</mat-icon>
                <div>Notifications</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='conversation'" (click)="changeSelected('conversation')" routerLink="conversation">
                <mat-icon class="icon-display">mail_outline</mat-icon>
                <div>Conversation</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='profile'" (click)="changeSelected('profile')" routerLink="profile">
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

export class DashboardOptionsComponent {
    @Output() dashboardOptionValueChanged = new EventEmitter();
    dashboardOption = '';

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.firstChild?.url.subscribe(urlSegments => {
            const url = urlSegments.map(segment => segment.path).join('/');
            console.log(url);
            switch (url) {
                case 'home':
                    this.dashboardOption = 'home';
                    break;
                case 'explore':
                    this.dashboardOption = 'explore';
                    break;
                case 'notifications':
                    this.dashboardOption = 'notifications';
                    break;
                case 'conversation':
                    this.dashboardOption = 'conversation';
                    break;
                case 'profile':
                    this.dashboardOption = 'profile';
                    break;
                default:
                    this.dashboardOption = 'home';
                    break;
            }
        });
    }

    changeSelected(option: string) {
        this.dashboardOption = option;
        this.dashboardOptionValueChanged.emit(this.dashboardOption);
    }
}