import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Injectable({ providedIn: 'root' })
export class JobsService {
    private data$ = new BehaviorSubject<JobDto[]>(null);
    data = this.data$.asObservable();

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

    getJob(id): Promise<JobDto> {
        return lastValueFrom(this.httpClient.get<JobDto>(environment.apiURL + `/jobs/${id}`));
    }

    removeJob(id: string): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.delete<JobDto[]>(environment.apiURL + `/jobs/${id}`));
    }

    applyForJob(jobId: string): Promise<any> {
        return lastValueFrom(this.httpClient.post<any>(environment.apiURL + `/jobs/apply`, { dto: { jobId, applicantId: this.user.id } }));
    }

    resignFromJobOffer(jobId: string): Promise<any> {
        return lastValueFrom(this.httpClient.post<any>(environment.apiURL + `/jobs/resign`, { dto: { jobId, applicantId: this.user.id } }));
    }

    public setData(data: JobDto[]) {
        this.data$.next(data);
    }
}