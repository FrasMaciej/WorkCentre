import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Injectable({ providedIn: 'root' })
export class JobsService {
    constructor(private httpClient: HttpClient, private user: LoggedUserService) { }

    getJobs(): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(environment.apiURL + '/jobs'));
    }

    getJobsAuthor(): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(environment.apiURL + `/jobs/author/${this.user.id}`));
    }

    addJob(job: JobDto): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.post<JobDto[]>(environment.apiURL + '/jobs', { job, ownerId: this.user.id }));
    }
}