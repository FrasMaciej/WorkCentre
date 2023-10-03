import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface Section {
    name: string;
    details: string;
}

@Component({
    selector: 'explore',
    template: `
        <div class="text-color">
            <div class="flex flex-row gap-x-6">
                <mat-form-field class="example-full-width ml-4">
                    <mat-label>Search</mat-label>
                    <span class="ml-1" matPrefix>
                        <mat-icon>search</mat-icon>
                    </span>
                    <input matInput type="text" [(ngModel)]="searchText">
                    <button *ngIf="searchText" matSuffix mat-icon-button aria-label="Clear" (click)="searchText=''">
                        <mat-icon>close</mat-icon>
                    </button>
                </mat-form-field>
                <mat-form-field class="input-width">
                    <mat-label >What are you looking for?</mat-label>
                    <mat-select [(ngModel)]="selectedItemType" (click)="log()">
                        <mat-option *ngFor="let itemType of itemTypes" [value]="itemType.value">
                            {{itemType.viewValue}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
            <div class="line-bottom"></div>
            <mat-list *ngIf="true">
                <ng-container *ngIf="selectedItemType==='users'">
                    <mat-list-item *ngFor="let user of getCurrentList()" class="item_highlight"> 
                        <div class="flex flex-row items-center size">
                            <div class="circle-container cursor-pointer">
                                <img src="assets/avatar_placeholder.jpg" alt="Avatar">
                            </div>
                            <div class="ml-4 cursor-pointer ">
                                <div class="text-color" matListItemTitle>{{user.name}}</div>
                                <div class="text-color" matListItemLine>{{user.details}}</div>
                            </div>
                        </div>
                    </mat-list-item>
                </ng-container>
                <mat-divider></mat-divider>
                <ng-container *ngIf="selectedItemType==='jobs'">
                    <mat-list-item *ngFor="let offer of jobOffers" >
                        <div class="flex flex-row">
                            <div class="circle-container cursor-pointer">
                                <img src="assets/avatar_placeholder.jpg" alt="Avatar">
                            </div>
                            <div class="ml-4 cursor-pointer">
                                <div class="text-color" matListItemTitle>{{offer.name}}</div>
                                <div  class="text-color" matListItemLine>{{offer.details}}</div>
                            </div>
                        </div>
                    </mat-list-item>
                </ng-container>

            </mat-list>
            <mat-paginator
                [pageSize]="pageSize"
                [pageSizeOptions]="pageSizeOptions"
                [length]="users.length"
                (page)="onPageChange($event)">
            </mat-paginator>
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
            width: 55px; 
            height: 55px;
            border-radius: 50%;
            overflow: hidden;
            /* border: 2px solid #ccc;  */
        }

        .line-bottom {
            border-bottom: 1px solid gray; 
        }

        mat-icon {
            color: black;
        }

        .item_highlight:hover{
            /* background-color: red; */
            background-color: gray;
            color: var(--gray) !important;
        }

        .input-width {
            width: 250px;
        }

        mat-list {
            overflow: auto;
            max-height: 400px;
        }

        .size {
            height: 60px;
            padding-bottom: 18px;
        }
        
    `]
})
export class ExploreComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    searchFormControl = new FormControl('');
    searchText = '';
    itemTypes: any = [
        { value: 'jobs', viewValue: 'Jobs' },
        { value: 'users', viewValue: 'Users' },
        { value: 'companies', viewValue: 'Companies' },
    ];
    selectedItemType = 'users';
    pageSize = 5;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 10, 25];
    pageEvent!: PageEvent;
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
        {
            name: 'Test 4 Testowy 4',
            details: 'Student, IT intern',
        },
        {
            name: 'Test 5 Testowy 5',
            details: 'Student, IT intern',
        },
        {
            name: 'Test 6 Testowy 6',
            details: 'Student, IT intern',
        },
    ];
    jobOffers: Section[] = [
        {
            name: 'Praca 1',
            details: 'Comgemini',
        },
        {
            name: 'Praca 2',
            details: 'Comgemini',
        },
    ];

    constructor() { }

    ngOnInit() {
        this.paginator.pageSize = this.pageSize;
        this.paginator.pageIndex = this.pageIndex;
    }

    log() {
        console.log(this.selectedItemType);
    }

    getCurrentList(): Section[] {
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.users.slice(startIndex, endIndex);
    }

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }

}