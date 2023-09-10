export { }

declare global {
    interface UserDto {
        email: string,
        firstName: string,
        lastName: string,
        id?: string
    }

    interface ExtendedUserDto extends UserDto {
        password: string,
    }

    interface LoginUserDto {
        username: string;
        password: string;
    }
}