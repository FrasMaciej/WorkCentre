export interface Roles {
    owned: Role[]
}

type Role = 'employer' | 'employee' | 'admin' | 'moderator';