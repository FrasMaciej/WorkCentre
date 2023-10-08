import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-send-message-modal',
    template: `
    <div class="container">
      <h2 mat-dialog-title class="text-2xl font-semibold">Send Message</h2>
      <div mat-dialog-content class="w-full">
        <mat-form-field class="w-full">
          <textarea matInput placeholder="Type your message here" name="message" class="resize-none" rows="10"></textarea>
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="flex justify-end space-x-2">
        <button mat-button color="warn" (click)="onNoClick()">Cancel</button>
        <button mat-button color="primary" [mat-dialog-close]="message" cdkFocusInitial>Send</button>
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

    constructor(
        public dialogRef: MatDialogRef<SendMessageModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}