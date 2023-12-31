import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from './notifications/notifications.service';

@Component({
    selector: 'dashboard-options',
    template: `
        <div class="flex flex-col justify-center items-start gap-y-7 pl-4 text-gray">
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='home'" (click)="changeSelected('home')" routerLink="home">
                <mat-icon class="icon-display">home</mat-icon> 
                <div>Home</div>
             </button>
             <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='recruiter-panel'" (click)="changeSelected('recruiter-panel')" routerLink="recruiter-panel">
                <mat-icon class="icon-display">work</mat-icon> 
                <div>Recruiter Panel</div>
             </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='explore'" (click)="changeSelected('explore')" routerLink="explore">
                <mat-icon class="icon-display">explore</mat-icon>
                <div>Explore</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='notifications'" (click)="changeSelected('notifications')" routerLink="notifications">
                <mat-icon class="icon-display">notifications_none</mat-icon>
                <div>Notifications</div>
                <div class="font-color-red">{{notificationsNumber}}</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='conversation'" (click)="changeSelected('conversation')" routerLink="conversation">
                <mat-icon class="icon-display">mail_outline</mat-icon>
                <div>Conversation</div>
            </button>
            <button class="flex gap-x-3 items-center" [class.font-color-red]="dashboardOption==='profile'" (click)="changeSelected('profile')" routerLink="profile/me">
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
    notificationsNumber: number;

    constructor(private router: Router, private route: ActivatedRoute, private notificationsService: NotificationsService) { }

    async ngOnInit() {
        const notifications = await this.notificationsService.getNotifications();
        this.notificationsNumber = notifications.filter(n => n.viewed == false).length;

        this.notificationsService.notificationsNumberChangeEmitted$.subscribe(num => {
            this.notificationsNumber = num;
        });

        this.route.firstChild?.url.subscribe(urlSegments => {
            const url = urlSegments.map(segment => segment.path).join('/');
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
                case 'recruiter-panel':
                    this.dashboardOption = 'recruiter-panel';
                    break;
                default:
                    this.dashboardOption = 'home';
                    break;
            }
        });
        this.dashboardOptionValueChanged.emit(this.dashboardOption);
    }

    changeSelected(option: string) {
        this.dashboardOption = option;
        this.dashboardOptionValueChanged.emit(this.dashboardOption);
    }
}