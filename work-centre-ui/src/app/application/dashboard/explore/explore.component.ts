import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ExploreService } from './explore.service';

export interface Section {
    name: string;
    details: string;
}

interface Lists {
    users: UserInfoDto[],
    jobs: JobDto[]
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
                    <mat-select [(ngModel)]="selectedItemType">
                        <mat-option *ngFor="let itemType of itemTypes" [value]="itemType.value">
                            {{itemType.viewValue}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
            <div class="line-bottom"></div>
            <mat-list>
                <ng-container *ngIf="selectedItemType==='users'">
                    <users-list [users]="currentList.users" />
                </ng-container>
                <ng-container *ngIf="selectedItemType==='jobs'">
                    <jobs-list [jobs]="currentList.jobs"/>
                </ng-container>
            </mat-list>
            <mat-paginator
                [pageSize]="pageSize"
                [pageSizeOptions]="pageSizeOptions"
                [length]="getListLength()"
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
        }

        .line-bottom {
            border-bottom: 1px solid gray; 
        }

        mat-icon {
            color: black;
        }

        .item_highlight:hover{
            background-color: gray;
            color: var(--gray) !important;
        }

        .input-width {
            width: 250px;
        }

        mat-list {
            overflow: auto;
            max-height: 550px;
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
    itemTypes: any[] = [
        { value: 'jobs', viewValue: 'Jobs' },
        { value: 'users', viewValue: 'Users' },
        { value: 'companies', viewValue: 'Companies' },
    ];
    selectedItemType = 'users';
    pageSize = 5;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 10, 25];
    pageEvent!: PageEvent;
    lists: Lists = {
        users: [],
        jobs: []
    }

    currentList: Lists = {
        users: [],
        jobs: []
    }

    constructor(private usersService: ExploreService, private exploreService: ExploreService) { }

    async ngOnInit() {
        this.lists.users = await this.getUsers();
        this.lists.jobs = await this.getJobs();
        this.currentList.users = this.lists.users.slice(0, this.pageSize);
        this.currentList.jobs = this.lists.jobs.slice(0, this.pageSize);

        this.paginator.pageSize = this.pageSize;
        this.paginator.pageIndex = this.pageIndex;
    }

    async getUsers() {
        return this.usersService.getUsers();
    }

    async getJobs() {
        return this.exploreService.getJobs();
    }

    onPageChange(event: PageEvent) {
        if (this.selectedItemType === 'users') {
            return this.currentList.users = this.lists.users.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize);
        } else if (this.selectedItemType === 'jobs') {
            return this.currentList.jobs = this.lists.jobs.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize);;
        } else {
            return 0;
        }
    }

    getListLength() {
        if (this.selectedItemType === 'users') {
            return this.lists.users.length;
        } else if (this.selectedItemType === 'jobs') {
            return this.lists.jobs.length;
        } else {
            return 0;
        }
    }
}