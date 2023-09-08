import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    constructor(private http: HttpClient) { }

    async registerUser(userData: ExtendedUserDto): Promise<any> {
        return lastValueFrom(this.http.post(environment.apiURL + '/register', userData));
    }

}