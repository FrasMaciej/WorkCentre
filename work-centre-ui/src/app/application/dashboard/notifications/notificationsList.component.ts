import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Component({
    selector: 'notifications-list',
    template: `
        <div class="p-4">
            <mat-list>
                <mat-list-item
                *ngFor="let notification of notifications"
                (click)="onNotificationClick(notification)"
                [class.selected]="notification === selectedNotification">
                <div class="flex items-center justify-center cursor-pointer py-2">
                    <div class="text-white">{{ notification.title }}</div>
                </div>
                </mat-list-item>
            </mat-list>
        </div>
    `,
    styles: [`
        .mat-list-item:hover {
        background-color: #4a5568;
        cursor: pointer;
        }

        .selected {
        background-color: #2d3748;
        }
    `]
})

export class NotificationsListComponent implements OnInit {
    notifications: NotificationsDto[];
    selectedNotification: NotificationsDto;

    constructor(private notificationsService: NotificationsService) { }

    async ngOnInit() {
        const notifications = await this.notificationsService.getNotifications()
        this.notifications = notifications;
        if (this?.notifications[0]) {
            this.selectedNotification = this.notifications[0];
            this.notificationsService.emitChange(this.selectedNotification);
        }
    }

    onNotificationClick(notification: NotificationsDto) {
        this.selectedNotification = notification;
        this.notificationsService.emitChange(notification);
    }
}