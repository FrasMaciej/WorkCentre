import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthorizationService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // const expectedRole = route.data.expectedRole;
        // const token = localStorage.getItem('token');
        // const tokenPayload = decode(token);

        // if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
        //     this.router.navigate(['login']);
        //     return false;
        // }
        // return true;
        return true;
    }
}