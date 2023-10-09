import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { ConversationService } from './conversation.service';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';


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
  @Input() receiverId = '';
  @ViewChild('messagesList') messagesList!: ElementRef;
  @ViewChild('formElement') formElement!: ElementRef;
  @ViewChild('inputElement') inputElement!: ElementRef;

  private socket: any;
  messageText: string = ''
  messages: Array<any> = [];
  userId = '';

  constructor(private conversationService: ConversationService, private user: LoggedUserService) {
  }

  ngOnInit() {
    this.messages = new Array();
    const userInfo: any = localStorage.getItem('userInfo');
    this.userId = JSON.parse(userInfo)._id;

    this.conversationService.getMessages().subscribe((msg: any) => {
      this.receiveMessage(msg);
    });
  }

  receiveMessage(msg: any) {
    if (this.userId !== msg.senderId) {
      msg.incoming = true;
      this.messages.push(msg);
    }
  }

  sendMessage() {
    this.conversationService.sendMessage({
      sender: this.user.data._id,
      receiver: this.receiverId,
      content: this.messageText,
      timestamp: new Date()
    });
    this.messages.push({ text: this.messageText, senderId: this.userId, });
    this.messageText = '';
  }
}