import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
    selector: 'dashboard',
    template: `
        <div class="custom-grid">
            <section class="color-dark" >
                <div class="justify-center items-center flex h-full text-3xl">
                    StarJobs
                </div>
            </section>
            <section class="color-gray with-border">
            </section>
            <section class="color-gray">
            </section>
            <section class="color-dark font-medium">
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
            </section>
            <section class="color-gray with-border">
            </section>
            <section class="color-gray">
            </section>
            <section class="color-dark">
            </section>
            <section class="color-gray with-border">
            </section>
            <section class="color-gray">
            </section>
        </div>
    `,
    styles: [`
        .color-gray {
            background-color: #26272B;
        }

        .color-dark {
            background-color: #1B1919;
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

        .text-gray {
            color: #B3ACAC;
        }

        .with-border {
            border-right: 1px solid gray; 
        }

        .icon-display {
            transform: scale(1.3);
        }
    `]
})

export class DashboardComponent implements OnInit {

    constructor(private router: Router, private authorizationService: AuthorizationService) { }

    async ngOnInit() {
    }

    logout() {
    }

}