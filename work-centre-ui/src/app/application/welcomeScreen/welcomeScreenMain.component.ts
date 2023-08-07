import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'welcome-screen-main',
    template: `
    <mat-toolbar>
        <span class="spacer"></span>
        <button class="m-3 text-white" mat-button color="primary">Sign up</button>
        <button mat-fab extended color="primary" class="bg-white text-black">
            <mat-icon>key</mat-icon>
            Sign in
        </button>
    </mat-toolbar>
    <div class="flex justify-between items-center">
        <div class="ml-24 mt-32">
            <svg-icon src="assets/logo/logoBlack.svg" [svgStyle]="{ 'width.px':500, 'height.px': 200 }"></svg-icon>
        </div>
        <div class="mr-96 mt-32 flex flex-col gap-3">
            <button mat-fab extended color="primary" class="bg-black border-white rounded-lg main-button">
                Browse without account
            </button>
            <button mat-fab extended color="primary" class="bg-white text-black main-button">
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
            width: 250px;
            height: 50px;
        }

        mat-toolbar {
            background-color: black;
        }

    `]
})

export class WelcomeScreenMainComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}