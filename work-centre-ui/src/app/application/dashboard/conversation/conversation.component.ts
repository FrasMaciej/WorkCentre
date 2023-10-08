import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as io from 'socket.io-client';


@Component({
    selector: 'app-conversation',
    template: `
     <div class="chat-container">
      <div class="messages" #messagesList>
        <div *ngFor="let message of messages" [ngClass]="{'incoming': message.incoming, 'outgoing': !message.incoming}">
          {{ message.text }}
        </div>
      </div>
      <form #formElement>
        <input #inputElement autocomplete="off" [(ngModel)]="messageText" name="messageText" />
        <button class="text-white" (click)="sendMessage()">Send</button>
      </form>
    </div>
    `,
    styles: [`
      .chat-container {
        display: flex;
        flex-direction: column;
        height: 70vh;
      }
      .messages {
        flex-grow: 1;
        overflow-y: auto;
        padding: 10px;
      }
      .incoming {
        background-color: #efefef;
        margin-bottom: 5px;
        border-radius: 5px;
        padding: 8px;
        align-self: flex-start;
        color: black;
      }
      .outgoing {
        background-color: #4CAF50;
        color: black;
        margin-bottom: 5px;
        border-radius: 5px;
        padding: 8px;
        align-self: flex-end;
      }
      form {
        background: #f1f1f1;
        padding: 10px;
        display: flex;
        align-items: center;
        border-top: 1px solid #ccc;
      }
      input {
        border: none;
        padding: 8px;
        flex-grow: 1;
        border-radius: 5px;
        margin-right: 10px;
        color: black;
      }
      button {
        background: #333;
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        color: black;
        cursor: pointer;
      }
    `]
})
export class ConversationComponent implements OnInit {
    @ViewChild('messagesList') messagesList!: ElementRef;
    @ViewChild('formElement') formElement!: ElementRef;
    @ViewChild('inputElement') inputElement!: ElementRef;

    private socket: any;
    messageText: string = ''
    messages: Array<any> = [];
    userId = '';

    constructor() {
        this.socket = io.connect('https://star-jobs-api.azurewebsites.net');
    }

    ngOnInit() {
        this.messages = new Array();
        const userInfo: any = localStorage.getItem('userInfo');
        this.userId = JSON.parse(userInfo)._id;

        this.socket.on('message-received', (msg: any) => {
            this.receiveMessage(msg);
        });
        this.socket.emit('event1', {
            msg: 'Client to server, can you hear me server?'
        });
        this.socket.on('event2', (data: any) => {
            console.log(data.msg);
            this.socket.emit('event3', {
                msg: 'Yes, its working for me!!'
            });
        });
        this.socket.on('event4', (data: any) => {
            console.log(data.msg);
        });
    }

    receiveMessage(msg: any) {
        if (this.userId !== msg.senderId) {
            msg.incoming = true;
            this.messages.push(msg);
        }
    }

    sendMessage() {
        const message = {
            text: this.messageText,
            senderId: this.userId,
        };
        this.socket.emit('send-message', message);
        this.messages.push(message);
        this.messageText = 'aaa';
    }
}
