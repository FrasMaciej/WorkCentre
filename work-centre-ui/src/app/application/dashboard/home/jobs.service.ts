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

    async getJobs(): Promise<any> {
        await lastValueFrom(this.httpClient.get(environment.apiURL + '/job/session2', { withCredentials: true }));
        return lastValueFrom(this.httpClient.get(environment.apiURL + '/jobs', { withCredentials: true }));
    }

    getJobsAuthor(): Promise<any> {
        return lastValueFrom(this.httpClient.get<any>(environment.apiURL + `/jobs/author/${this.user.id}`, { withCredentials: true }));
    }

    addJob(job: JobDto): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.post<JobDto[]>(environment.apiURL + '/jobs', { job, ownerId: this.user.id }, { withCredentials: true }));
    }

    getJob(id): Promise<JobDto> {
        return lastValueFrom(this.httpClient.get<JobDto>(environment.apiURL + `/jobs/${id}`, { withCredentials: true }));
    }

    removeJob(id: string): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.delete<JobDto[]>(environment.apiURL + `/jobs/${id}`, { withCredentials: true }));
    }

    applyForJob(jobId: string): Promise<any> {
        return lastValueFrom(this.httpClient.post<any>(environment.apiURL + `/jobs/apply`, { dto: { jobId, applicantId: this.user.id } }, { withCredentials: true }));
    }

    resignFromJobOffer(jobId: string): Promise<any> {
        return lastValueFrom(this.httpClient.post<any>(environment.apiURL + `/jobs/resign`, { dto: { jobId, applicantId: this.user.id } }, { withCredentials: true }));
    }

    getAppliedJobOffers(): Promise<JobDto[]> {
        return lastValueFrom(this.httpClient.get<JobDto[]>(environment.apiURL + `/jobs/applicant/${this.user.id}`, { withCredentials: true }));
    }

    getJobOfferApplicants(offerId: string): Promise<UserDetailsDto[]> {
        return lastValueFrom(this.httpClient.get<UserDetailsDto[]>(environment.apiURL + `/job/applicants/${offerId}`, { withCredentials: true }));
    }

    updateJobState(dto: EditOfferStateDto): Promise<UserDetailsDto[]> {
        return lastValueFrom(this.httpClient.put<UserDetailsDto[]>(environment.apiURL + '/job/application/edit-state', dto, { withCredentials: true }));
    }

    getBestCandidates(dto: BestCandidateMatchDto): Promise<UserDetailsDto[]> {
        return lastValueFrom(this.httpClient.post<UserDetailsDto[]>(environment.apiURL + '/job/best-candidates', dto, { withCredentials: true }));
    }

    public setData(data: JobDto[]) {
        this.data$.next(data);
    }

    mapApplicantStatus(status) {
        switch (status) {
            case 'default':
                return 'Uncategorized';
            case 'inConsideration':
                return 'In consideration';
            case 'consideredPositive':
                return 'Considered positive';
            case 'consideredNegative':
                return 'Considered negative';
            case 'accepted':
                return 'Job proposal';
            case 'rejected':
                return 'No job proposal';
            default:
                return 'Status Unknown';
        }
    }

}