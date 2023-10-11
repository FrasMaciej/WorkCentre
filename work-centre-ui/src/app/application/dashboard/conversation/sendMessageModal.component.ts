import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConversationService } from './conversation.service';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Component({
  selector: 'app-send-message-modal',
  template: `
    <div class="container">
      <h2 mat-dialog-title class="text-2xl font-semibold">Send Message</h2>
      <div mat-dialog-content class="w-full">
        <mat-form-field class="w-full">
          <textarea matInput placeholder="Type your message here" name="message" class="resize-none" rows="10" [(ngModel)]="message"></textarea>
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="flex justify-end space-x-2">
        <button mat-button color="warn" (click)="onNoClick()">Cancel</button>
        <button mat-button color="primary" [mat-dialog-close]="message" (click)="sendMessage()" cdkFocusInitial>Send</button>
      </div>
    </div>
  `,
  styles: [`
    textarea {
      height: 150px;
    }
  `]
})
export class SendMessageModalComponent {
  message: string = '';
  receiverId: string = '';

  constructor(
    private conversationService: ConversationService,
    public dialogRef: MatDialogRef<SendMessageModalComponent>,
    private user: LoggedUserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage() {
    this.conversationService.sendDedicatedMessage({
      sender: this.user.id,
      receiver: this.data.recipientId,
      content: this.message,
      timestamp: new Date()
    });
  }
}