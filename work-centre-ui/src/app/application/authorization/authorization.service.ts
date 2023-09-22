import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

    async registerUser(userData: ExtendedUserDto): Promise<any> {
        return lastValueFrom(this.http.post(environment.apiURL + '/register', userData));
    }

    async loginUser(userData: LoginUserDto): Promise<any> {
        return lastValueFrom(this.http.post(environment.apiURL + '/login', userData, { withCredentials: true }));
    }

    async isSessionActive(): Promise<any> {
        return lastValueFrom(this.http.get(environment.apiURL + '/session', { withCredentials: true }));
    }

    async logout(): Promise<any> {
        return lastValueFrom(this.http.post(environment.apiURL + '/logout', {}, { withCredentials: true }));
    }

    public async isAuthenticated() {
        const response = await this.isSessionActive();
        return response.isAuthenticated;
    }
}