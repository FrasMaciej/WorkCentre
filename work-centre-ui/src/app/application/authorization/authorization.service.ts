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
        return lastValueFrom(this.http.post(environment.apiURL + '/login', userData));
    }

    async authTest(): Promise<any> {
        return lastValueFrom(this.http.get(environment.apiURL + '/test2'));
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}