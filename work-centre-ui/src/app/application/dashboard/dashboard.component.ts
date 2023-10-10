import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';
import { ConversationsListComponent } from './conversation/conversationsList.component';
import { ConversationComponent } from './conversation/conversation.component';

@Component({
    selector: 'dashboard',
    template: `
        <div class="custom-grid">
            <section class="color-dark" >
                <div class="justify-center items-center flex h-full text-3xl">
                    <span class="font-color-red">Star</span>Jobs
                </div>
            </section>
            <section class="color-gray with-border">
            </section>
            <section class="color-gray">
            </section>
            <section class="color-dark font-medium">
                <dashboard-options (dashboardOptionValueChanged)="getDashboardOption($event)"></dashboard-options>
            </section>
            <section class="color-gray with-border">
                <conversations-list (chatSelected)="onChatSelect($event)"></conversations-list>
            </section>
            <section class="color-gray">
                <router-outlet></router-outlet>
            </section>
            <section class="color-dark">
                <div class="flex justify-center">
                    <button class="flex gap-x-3 items-center font-color-red text-lg logout" (click)="logout()">Logout</button>
                </div>
            </section>
            <section class="color-gray with-border">
            </section>
            <section class="color-gray">
            </section>
        </div>
    `,
    styles: [`
        .color-gray {
            background-color: var(--gray);
        }

        .color-dark {
            background-color: var(--dark);
        }

        .font-color-red {
            color: var(--red);
        }

        .custom-grid {
            display: grid;
            grid-template-columns: 2fr 3fr 12fr;
            grid-template-rows: 1.5fr 10fr 1fr;
            min-height: 100vh; 
        }

        section {
            min-height: 0; 
            box-sizing: border-box; 
        }

        .with-border {
            border-right: 1px solid gray; 
        }

        .icon-display {
            transform: scale(1.3);
        }

        .logout:hover {
            color: white;
        }
        
    `]
})

export class DashboardComponent {
    @ViewChild(ConversationComponent, { static: false }) conversationComponent!: ConversationComponent;
    dashboardOption = '';

    constructor(private router: Router, private authorizationService: AuthorizationService, private route: ActivatedRoute) { }

    async logout() {
        try {
            await this.authorizationService.logout();
            this.router.navigate(['']);
        } catch (err) {
            console.error(err);
        }
    }

    getDashboardOption(option: string) {
        this.dashboardOption = option;
    }

    onChatSelect(chat: any) {
        this.conversationComponent.chat = chat;
    }
}