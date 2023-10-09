import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private socket: any;

  constructor(private httpClient: HttpClient) {
    this.socket = io.connect('http://localhost:3000');
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message-received', (msg: any) => {
        observer.next(msg);
      });
    });
  }

  sendMessage(message: sendMessageDto): void {
    this.socket.emit('send-message', message);
  }

  getConverstations(userId: string) {

  }
}