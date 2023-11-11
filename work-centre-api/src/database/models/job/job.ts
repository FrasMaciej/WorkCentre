export interface JobSchema {
    name: string;
    company: string;
    dateFrom: Date;
    dateTo: Date;
    details: string;
    applicantsIds: string[];
}