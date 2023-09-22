import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({ providedIn: 'root' })
export class IsLoggedInService implements CanActivate {
    private sub: any;

    constructor(public auth: AuthorizationService, public router: Router, private route: ActivatedRoute) { }
    async canActivate() {
        const isAuthenticated = await this.auth.isAuthenticated();
        if (isAuthenticated) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}