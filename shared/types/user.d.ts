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
}