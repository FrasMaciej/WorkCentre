import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'conversations-list',
    template: `
    <div class="p-4">
      <mat-list>
        <mat-list-item *ngFor="let user of users" (click)="onConversationClick(user)">
          <div class="flex items-center cursor-pointer border-b border-gray-600 py-2">
            <div class="ml-3">
              <h3 matLine class="text-white">{{ user.name }}</h3>
            </div>
          </div>
        </mat-list-item>
      </mat-list>
    </div>
  `,
    styles: [`
    .mat-list-item:hover {
      background-color: #4a5568;
      cursor: pointer;
    }
  `]
})

export class ConversationsListComponent implements OnInit {
    @Output() chatSelected = new EventEmitter<string>();
    users = [
        { _id: 1, name: 'User 1' },
        { _id: 2, name: 'User 2' },
        { _id: 3, name: 'User 3' },
    ];

    constructor() { }

    ngOnInit() { 
        
    }

    onConversationClick(conversation: any) {
        console.log('Clicked on conversation:', conversation);
    }
}