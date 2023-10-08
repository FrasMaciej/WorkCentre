import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class ProfileService {
    constructor(private httpClient: HttpClient) { }
    
    getUserDetails(userId: string): Promise<UserDetailsDto> {
        return lastValueFrom(this.httpClient.get<UserDetailsDto>(`${environment.apiURL}/user/${userId}`));
    }
}