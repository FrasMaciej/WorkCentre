import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private httpClient: HttpClient) { }

    getUsers(): Promise<UserInfoDto[]> {
        return lastValueFrom(this.httpClient.get<UserInfoDto[]>(environment.apiURL + '/users'));
    }
}