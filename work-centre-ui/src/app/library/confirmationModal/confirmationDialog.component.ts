import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonControlsModule } from '../commonControls.module';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonControlsModule, CommonModule],
  selector: 'app-confirm-dialog',
  template: `
    <div class="flex flex-col">
      <h1 mat-dialog-title class="text-white p-4" [class]="backgroundColor">Confirmation</h1>
      <div mat-dialog-content class="p-4">{{ confirmMessage }}</div>
      <div class="p-4 flex flex-row justify-end" *ngIf="buttonColor">
        <button mat-stroked-button color="basic" (click)="dialogRef.close(false)" class="mr-2">Cancel</button>
        <button mat-raised-button [color]="buttonColor" (click)="dialogRef.close(true)">Confirm</button>
      </div>
    </div>
  `,
  styles: [
    `
      
    `
  ]
})
export class ConfirmationDialog {
  confirmMessage = '';
  type: 'warning' | 'confirm' = 'warning';
  buttonColor;
  backgroundColor;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.setColors();
  }

  setColors() {
    let button;
    let background;
    this.data.type === 'warning' ? button = 'warn' : button = 'primary';
    this.data.type === 'warning' ? background = 'bg-red-700' : background = 'bg-blue-700';
    this.backgroundColor = background;
    this.buttonColor = button;
  }

}

interface DialogData {
  confirmMessage: string;
  type: string;
}