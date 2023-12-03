import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ExploreService {
    constructor(private httpClient: HttpClient) { }

    getUsers(): Promise<UserInfoDto[]> {
        return lastValueFrom(this.httpClient.get<UserInfoDto[]>(environment.apiURL + '/users', { withCredentials: true }));
    }

    getUsersDetailed(): Promise<UserDetailsDto[]> {
        return lastValueFrom(this.httpClient.get<UserDetailsDto[]>(environment.apiURL + '/users-detailed', { withCredentials: true }));
    }

    getJobs(): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.get<JobDto[]>(environment.apiURL + '/jobs', { withCredentials: true }));
    }
}