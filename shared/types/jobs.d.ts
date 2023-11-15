export { }

declare global {
    interface JobDto {
        name: string,
        company: string,
        details: string,
        dateFrom: Date,
        dateTo: Date,
        applicants: Applicant[];
        author?: string,
        salary?: string,
        location?: string
    }

    export interface Applicant {
        id: string;
        state: string;
    }

    interface ExtendedJobDto extends JobDto {
        _id?: string;
    }

    interface ApplyForJobDto {
        jobId: string,
        applicantId: string;
    }

    interface ApplyForJobDto {
        jobId: string,
        applicantId: string;
    }

    interface GetJobApplicantsDto {
        id: string;
    }

    interface EditOfferStateDto {
        offerId: string;
        workerId: string;
        state: string;
    }

    interface BestCandidateMatchDto {
        offer: JobDto;
        candidates: UserDetailsDto[];
    }
}