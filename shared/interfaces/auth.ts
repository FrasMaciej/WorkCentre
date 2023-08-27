export interface AddUserDto {
    username: string,
    firstName: string,
    lastName: string,
}

export interface UserDto extends AddUserDto {
    password: string,
}