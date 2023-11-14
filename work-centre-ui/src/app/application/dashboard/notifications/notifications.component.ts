import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Component({
    selector: 'notifications',
    template: `
        <div *ngIf="notification?.content">        
            {{notification.content}}
        </div>
    `
})

export class NotificationsComponent implements OnInit {
    notification: NotificationsDto;

    constructor(private notificationsService: NotificationsService) {
        this.notificationsService.changeEmitted$.subscribe(notification => {
            this.notification = notification;
        });
    }

    ngOnInit() {

    }
}