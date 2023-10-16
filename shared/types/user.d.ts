export { }

declare global {

    interface UserListDto extends UserInfoDto {
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
    }

    interface UserDetails {
        headerInfo: string;
        company: string;
        skills: Skill[];
        profileDescription: string;
        experience: UserExperienceDto[];
        phone: number;
        email: string;
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