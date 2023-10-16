import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class ProfileService {
    constructor(private httpClient: HttpClient) { }
    
    getUserDetails(userId: string): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(`${environment.apiURL}/user/${userId}`));
    }

    updateUserProfile(dto: UpdateUserDto) {
        return lastValueFrom(this.httpClient.put<UpdateUserDto>(`${environment.apiURL}/user`, dto));
    }
}