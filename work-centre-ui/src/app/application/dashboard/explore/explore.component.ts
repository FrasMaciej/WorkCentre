import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface Section {
    name: string;
    details: string;
}

@Component({
    selector: 'explore',
    template: `
        <div class="text-color">
            <mat-form-field class="example-full-width ml-14">
                <mat-label>Search</mat-label>
                <input matInput [formControl]="searchFormControl">
            </mat-form-field>
            <mat-list>
                <div mat-subheader>Users</div>
                    <mat-list-item *ngFor="let user of users">
                        <div class="flex flex-row">
                            <div class="circle-container"></div>
                            <div class="ml-4">
                                <div class="text-color" matListItemTitle>{{user.name}}</div>
                                <div class="text-color" matListItemLine>{{user.details}}</div>
                            </div>
                        </div>
                    </mat-list-item>
                <mat-divider></mat-divider>
                <div mat-subheader>Job offers</div>
                <mat-list-item *ngFor="let offer of jobOffers" class="cursor-pointer">
                    <div class="flex flex-row">
                        <div class="circle-container"></div>
                        <div class="ml-4">
                            <div class="text-color" matListItemTitle>{{offer.name}}</div>
                            <div  class="text-color" matListItemLine>{{offer.details}}</div>
                        </div>
                    </div>
                </mat-list-item>
            </mat-list>
        </div>
    `,
    styles: [`
        .mat-mdc-list-item-icon {
            color: rgba(0, 0, 0, 0.54);
        }

        .text-color {
            color: var(--white);
        }

        .circle-container {
            width: 55px; /* Możesz dostosować rozmiar według własnych preferencji */
            height: 55px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #ccc; /* Dodaj obramowanie, jeśli chcesz */
        }

    `]
})
export class ExploreComponent implements OnInit {
    searchFormControl = new FormControl('');
    users: Section[] = [
        {
            name: 'Test 1 Testowy 1',
            details: 'Student, IT intern',
        },
        {
            name: 'Test 2 Testowy 2',
            details: 'Student, IT intern',
        },
        {
            name: 'Test 3 Testowy 3',
            details: 'Student, IT intern',
        },
    ];
    jobOffers: Section[] = [
        {
            name: 'Test 1 Testowy 1',
            details: 'Student, IT intern',
        },
        {
            name: 'Test 2 Testowy 2',
            details: 'Student, IT intern',
        },
    ];

    constructor() { }

    ngOnInit() { }
}