import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { ConversationService } from './conversation.service';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';
import { Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-conversation',
  template: `
     <div class="chat-container">
      <div class="messages" #messagesList #scrollMe>
        <div *ngFor="let message of chat.messages" [ngClass]="{'incoming': getUserId() === message.sender, 'outgoing': getUserId() !== message.sender}">
          {{ message.content }}
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
export class ConversationComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() receiverId: string | any = '';
  @ViewChild('messagesList') messagesList!: ElementRef;
  @ViewChild('formElement') formElement!: ElementRef;
  @ViewChild('inputElement') inputElement!: ElementRef;
  @ViewChild('scrollMe') myScrollContainer!: ElementRef;

  private messagesSubscription: Subscription | undefined;

  messageText: string = ''
  chat: ConversationDto = {
    messages: [],
    members: [],
    label: '',
    _id: ''
  };

  constructor(private conversationService: ConversationService, private user: LoggedUserService, private renderer: Renderer2) {
    conversationService.changeEmitted$.subscribe(chat => {
      this.chat = chat;
      this.receiverId = this.chat.members.find(m => m._id !== this.user.id)?._id;
      if (this.messagesSubscription) {
        this.messagesSubscription.unsubscribe();
      }
      this.messagesSubscription = this.conversationService.getMessages().subscribe((msg: any) => {
        this.chat.messages.push(msg);
      });
    });
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }


  sendMessage() {
    if (!this.messageText) {
      return;
    }
    this.conversationService.sendMessage({
      sender: this.user.id,
      receiver: this.receiverId,
      content: this.messageText,
      timestamp: new Date(),
      chatId: this.chat._id
    });
    this.messageText = '';
  }

  getUserId() {
    return this.user.id;
  }
}
