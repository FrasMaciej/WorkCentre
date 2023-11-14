export { }

declare global {

    interface UserListDto extends UserInfoDto {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    }

    interface UserInfoDto {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    }

    interface UpdateUserDto {
        _id: string;
        userDetails: UserDetails;
    }

    interface UserDetailsDto extends UserInfoDto {
        headerInfo: string;
        company: string;
        skills: Skill[];
        profileDescription: string;
        experience: UserExperienceDto[];
        phone: number;
        state: string;
        location?: string;
    }

    interface UserDetails {
        headerInfo: string;
        company: string;
        skills: Skill[];
        profileDescription: string;
        experience: UserExperienceDto[];
        phone: number;
        email: string;
        location?: string;
    }

    interface UserExperienceDto {
        name: string;
        place?: string;
        period: {
            from: Date;
            to: Date;
            form?: any;
        }
    }

    export interface Skill {
        name: string;
        description: string;
    }
}