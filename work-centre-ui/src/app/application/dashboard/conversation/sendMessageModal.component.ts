import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import reactive forms modules
import { ConversationService } from './conversation.service';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Component({
  selector: 'app-send-message-modal',
  template: `
    <div class="container">
      <div class="flex flex-col justify-between"> 
        <div>
          <h2 mat-dialog-title class="text-2xl font-semibold">Send Message</h2>
          <div mat-dialog-content class="w-full">
            <form [formGroup]="sendMessageForm">
              <mat-form-field class="w-full">
                <textarea matInput placeholder="Type your message here" formControlName="message" class="resize-none" rows="10" required></textarea>
              </mat-form-field>
            </form>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <button mat-stroked-button color="warn" (click)="onNoClick()">Cancel</button>
          <button mat-raised-button color="primary" [mat-dialog-close]="sendMessageForm.value.message" (click)="sendMessage()" cdkFocusInitial [disabled]="sendMessageForm.invalid">Send</button>
        </div>
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
  sendMessageForm: FormGroup;
  receiverId: string = '';

  constructor(
    private conversationService: ConversationService,
    public dialogRef: MatDialogRef<SendMessageModalComponent>,
    private user: LoggedUserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.sendMessageForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage() {
    if (this.sendMessageForm.valid) {
      this.conversationService.sendDedicatedMessage({
        sender: this.user.id,
        receiver: this.data.recipientId,
        content: this.sendMessageForm.value.message,
        timestamp: new Date()
      });
      this.sendMessageForm.reset();
    } else {
      return;
    }
  }
}