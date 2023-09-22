import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthorizationService, public router: Router) { }
    async canActivate() {
        const isAuthenticated = await this.auth.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['sign-in']);
            return false;
        }
        return true;
    }
}