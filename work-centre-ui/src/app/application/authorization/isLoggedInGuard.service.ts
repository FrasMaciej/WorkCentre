import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({ providedIn: 'root' })
export class IsLoggedInService implements CanActivate {
    constructor(public auth: AuthorizationService, public router: Router) { }
    async canActivate() {
        if (await this.auth.isAuthenticated()) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }
}