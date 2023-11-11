import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonControlsModule } from '../commonControls.module';

@Component({
  standalone: true,
  imports: [CommonControlsModule],
  selector: 'app-confirm-dialog',
  template: `
    <div class="flex flex-col">
      <h1 mat-dialog-title class="bg-red-700 text-white p-4">Confirm</h1>
      <div mat-dialog-content class="p-4">{{ confirmMessage }}</div>
      <div class="p-4 flex flex-row justify-end">
        <button mat-stroked-button color="basic" (click)="dialogRef.close(false)" class="mr-2">Cancel</button>
        <button mat-raised-button color="warn" (click)="dialogRef.close(true)">Confirm</button>
      </div>
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