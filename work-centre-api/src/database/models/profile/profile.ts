export interface UserProfileSchema {
    company: string;
    headerInfo: string;
    skills: Skill[];
    profileDescription: string;
    experience: Experience[];
    phone: number;
}

export interface Skill {
    name: string;
    description: string;
}
export interface Experience {
    name: string;
    place?: string;
    period: {
        from: string;
        to: string;
    }
}