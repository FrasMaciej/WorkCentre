import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConversationService } from './conversation.service';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Component({
  selector: 'conversations-list',
  template: `
    <div class="p-4">
      <mat-list>
        <mat-list-item
          *ngFor="let chat of chats"
          (click)="onConversationClick(chat)"
          [class.selected]="chat === selectedChat">
          <div class="flex items-center justify-center cursor-pointer py-2">
              <div class="text-white">{{ chat.label }}</div>
          </div>
        </mat-list-item>
      </mat-list>
    </div>
  `,
  styles: [
    `
      .mat-list-item:hover {
        background-color: #4a5568;
        cursor: pointer;
      }

      .selected {
        background-color: #2d3748;
      }
    `,
  ],
})
export class ConversationsListComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<string>();
  chats: any = [];
  selectedChat: any;

  constructor(
    private conversationService: ConversationService,
    private user: LoggedUserService
  ) { }

  async ngOnInit() {
    const chats = await this.conversationService.getChats(this.user.id);
    this.chats = chats;
    if (this?.chats[0]) {
      this.selectedChat = this.chats[0];
      this.conversationService.emitChange(this.selectedChat);
    }
  }

  onConversationClick(chat: any) {
    this.selectedChat = chat;
    this.conversationService.emitChange(chat);
  }
}