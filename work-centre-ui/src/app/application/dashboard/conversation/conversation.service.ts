import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private socket: any;

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private httpClient: HttpClient) {
    this.socket = io.connect(environment.serverUrl);

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('connect_timeout', (timeout) => {
      console.error('WebSocket connection timeout:', timeout);
    });
  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
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

  sendDedicatedMessage(message: sendMessageDto): void {
    this.socket.emit('send-message-dedicated', message);
  }

  getChats(userId: string): Promise<ConversationDto> {
    return lastValueFrom(this.httpClient.get<ConversationDto>(environment.apiURL + '/chats/' + userId, { withCredentials: true }));
  }

  joinConversationRoom(conversationId: string): void {
    this.socket.emit('join-room', conversationId);
  }
}