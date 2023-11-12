export { }

declare global {
    interface JobDto {
        name: string,
        company: string,
        details: string,
        dateFrom: Date,
        dateTo: Date,
        applicantsIds: string[],
    }

    interface ExtendedJobDto extends JobDto {
        _id?: string;
    }

    interface ApplyForJobDto {
        jobId: string,
        applicantId: string;
    }
}