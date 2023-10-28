import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonControlsModule } from '../commonControls.module';

@Component({
  standalone: true,
  imports: [CommonControlsModule],
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title class="bg-blue-700 text-white p-4">Confirm</h1>
    <div mat-dialog-content class="p-4">{{ confirmMessage }}</div>
    <div mat-dialog-actions class="p-4">
      <button mat-button color="warn" (click)="dialogRef.close(true)">Confirm</button>
      <button mat-button (click)="dialogRef.close(false)">Cancel</button>
    </div>
  `,
})
export class ConfirmationDialog {
  confirmMessage = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
}

interface DialogData {
  confirmMessage: string;
}