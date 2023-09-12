import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    template: `
        <button (click)="logout()">Logout</button>
        <br>
        {{userData}}
    `,
    styles: [`
    
    `]
})

export class DashboardComponent implements OnInit {
    userData = {};

    constructor(private router: Router) { }

    ngOnInit() { }

    logout() {
        this.router.navigate(['/']);
    }


}