import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Component({
    selector: 'notifications',
    template: `
    <div class="flex justify-center items-center">
        <div class="flex justify-center items-center mt-24 envelope-background ">
            <div *ngIf="notification?.content" class="text-2xl">        
                {{notification.content}}
            </div>
        </div>
    </div>
    `,
    styles: [`
        .envelope-background {
            background-color: #f8f8f8;
            padding: 20px;
            border: 1px solid #ddd; 
            border-radius: 10%; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
            width: 500px; 
            color: black;
            height: 300px
        }
    `]
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