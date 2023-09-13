import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';

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

    constructor(private router: Router, private authorizationService: AuthorizationService) { }

    async ngOnInit() {
        this.userData = await this.authorizationService.authTest();
    }

    logout() {
        this.router.navigate(['/']);
    }


}