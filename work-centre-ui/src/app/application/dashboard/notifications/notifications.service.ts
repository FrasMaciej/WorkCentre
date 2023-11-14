import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();

    constructor(private httpClient: HttpClient, private user: LoggedUserService) { }

    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    getNotifications() {
        return lastValueFrom(this.httpClient.get<NotificationsDto[]>(`${environment.apiURL}/notifications/${this.user.id}`));
    }

}