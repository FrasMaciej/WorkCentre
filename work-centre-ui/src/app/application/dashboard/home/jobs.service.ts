import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JobsService {
    constructor(private httpClient: HttpClient) { }

    getJobs(): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(environment.apiURL + '/jobs'));
    }

    addJob(job: JobDto): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.post<JobDto[]>(environment.apiURL + '/jobs', { job }));
    }
}