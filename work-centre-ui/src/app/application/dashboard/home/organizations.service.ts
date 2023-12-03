import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Injectable({ providedIn: 'root' })
export class OrganizationsService {
    private data$ = new BehaviorSubject<OrganizationDto[]>(null);
    data = this.data$.asObservable();

    constructor(private httpClient: HttpClient, private user: LoggedUserService) { }

    getOrganizations(): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(environment.apiURL + '/organizations', { withCredentials: true }));
    }

    getOrganizationsOwner(): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(environment.apiURL + `/organizations/owner/${this.user.id}`, { withCredentials: true }));
    }

    addOrganization(organization: AddOrganizationDto): Promise<AddOrganizationDto[]> {
        return lastValueFrom(this.httpClient.post<AddOrganizationDto[]>(environment.apiURL + '/organizations', { organization, ownerId: this.user.id }, { withCredentials: true }));
    }

    removeOrganization(id: string): Promise<any> {
        return lastValueFrom(this.httpClient.delete<any>(environment.apiURL + `/organizations/${id}`, { withCredentials: true }));
    }

    public setData(data: OrganizationDto[]) {
        this.data$.next(data);
    }

}