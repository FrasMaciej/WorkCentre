export interface JobSchema {
    name: string;
    company: string;
    dateFrom: Date;
    dateTo: Date;
    details: string;
    applicants: Applicant[];
    author?: string;
    salary?: string;
    locatioN?: string;
}

export interface Applicant {
    id: string;
    state: StateType;
}

export type StateType = 'default' | 'inConsideration' | 'consideredPositive' | 'consideredNegative' | 'accepted' | 'rejected';

export const states = ['default', 'inConsideration', 'consideredPositive', 'consideredNegative', 'accepted', 'rejected'];