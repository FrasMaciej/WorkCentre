import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'welcome-screen-main',
    template: `
    <mat-toolbar>
        <span class="spacer"></span>
        <button class="m-3" mat-button color="primary">Sign up</button>
        <button mat-fab extended color="primary">
            <mat-icon>key</mat-icon>
            Sign in
        </button>
    </mat-toolbar>
    <div class="flex justify-center content-center">
        <svg-icon src="assets/logo/logoColor.svg" [svgStyle]="{ 'width.px':400, 'height.px': 400 }"></svg-icon>
    </div>
    <animated-slogan></animated-slogan>
    `,
    styles: [`
        .spacer {
            flex: 1 1 auto;
        }

    `]
})

export class WelcomeScreenMainComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}