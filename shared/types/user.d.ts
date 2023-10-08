export { }

declare global {

    interface UserListDto extends UserInfoDto{
    }
    
    interface UserInfoDto {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    }

    interface UserDetailsDto extends UserInfoDto {
        headerInfo: string;
        company: string;
        skills: string[];
        description: string;
        experience: UserExperienceDto[];
        phone: number;
    }

    interface UserExperienceDto {
        name: string;
        place?: string;
        period: {
            from: string;
            to: string;
        }
    }
}