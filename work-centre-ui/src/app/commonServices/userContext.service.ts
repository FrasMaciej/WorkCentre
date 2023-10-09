import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggedUserService {
    data: UserInfoDto;
    id: string;

    constructor() {
        const user = localStorage['userInfo'];
        const parsedUser = JSON.parse(user);
        this.data = parsedUser.local;
        this.id = parsedUser._id;
    }

}