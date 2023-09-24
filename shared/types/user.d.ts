export { }

declare global {
    interface UserInfoDto {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    }
}