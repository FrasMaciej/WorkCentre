import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'welcome-screen-main',
    template: `
    <mat-toolbar>
        <span class="spacer"></span>
        <button class="m-3 text-white" mat-button color="primary" (click)="navigate('sign-up')">Sign up</button>
        <button mat-fab extended color="primary" class="bg-white text-black" (click)="navigate('sign-in')">
            <mat-icon>key</mat-icon>
            Sign in
        </button>
    </mat-toolbar>
    <div class="flex justify-between items-center responsive">
        <div class="ml-16 mt-32">
            <svg-icon src="assets/logo/logoBlack.svg" [svgStyle]="{ 'width.px':500, 'height.px': 200 }"></svg-icon>
        </div>
        <div class="mr-96 mt-32 flex flex-col gap-3 responsive2">
            <button mat-fab extended color="primary" class="bg-black border-white rounded-lg main-button" (click)="navigate('panel')">
                Browse without account
            </button>
            <button mat-fab extended color="primary" class="bg-white text-black main-button" (click)="navigate('about-us')">
                About us
            </button>
        </div>
    </div>
    <div class="m-36">
        <animated-slogan></animated-slogan>
    </div>
    `,
    styles: [`
        .spacer {
            flex: 1 1 auto;
        }

        .main-button {
            width: 240px;
            height: 50px;
        }

        mat-toolbar {
            background-color: black;
        }

        @media (max-width: 768px) {
            .responsive {
                display: block;
            }

            animated-slogan {
                display: none;
            }
        }

    `]
})

export class WelcomeScreenMainComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    navigate(placeToNavigate: string) {
        this.router.navigate([placeToNavigate]);
    }
}