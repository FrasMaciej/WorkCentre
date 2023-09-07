
class User implements UserDto {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public id?: string | undefined
    ) { }
}

