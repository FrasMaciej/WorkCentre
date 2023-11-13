export { }

declare global {
    interface JobDto {
        name: string,
        company: string,
        details: string,
        dateFrom: Date,
        dateTo: Date,
        applicantsIds: string[],
        author?: string
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
}