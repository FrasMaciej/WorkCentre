import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'welcome-screen-main',
    template: `
    <mat-toolbar>
        <span class="spacer"></span>
        <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
            <mat-icon>favorite</mat-icon>
        </button>
        <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
        <mat-icon>share</mat-icon>
        </button>
    </mat-toolbar>
    <svg-icon src="assets/logo/logoColor.svg" [svgStyle]="{ 'width.px':900 }"></svg-icon>
    `,
    styles: [`
        .spacer {
            flex: 1 1 auto;
        }

        .divens {
            width: 200px;
            height: 200px;
        }
    `]
})

export class WelcomeScreenMainComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}