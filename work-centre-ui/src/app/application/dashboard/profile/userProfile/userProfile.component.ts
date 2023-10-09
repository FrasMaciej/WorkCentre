import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SendMessageModalComponent } from '../../conversation/sendMessageModal.component';

@Component({
  selector: 'user-profile',
  template: `
    <button mat-raised-button (click)="openSendMessageModal()">Send Message</button>
    <div *ngIf="userFound" class="container mx-auto p-8 bg-gray-900 text-white">
      <div class="flex items-center justify-between bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <div>
          <h2 class="text-3xl font-semibold mb-2 font-montserrat">{{user.firstName}} {{user.lastName}}</h2>
          <p class="text-gray-400">{{user.headerInfo}}</p>
          <p class="text-gray-400">{{user.company}}</p>
        </div>
        <img src="assets/avatar_placeholder.jpg" alt="Avatar" class="rounded-full w-16 h-16">
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Skills</h3>
        <ul class="flex flex-wrap">
          <li class="bg-blue-500 text-white p-2 m-2 rounded" *ngFor="let skill of user.skills">{{skill}}</li>
        </ul>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Description</h3>
        <p class="text-gray-400">
          {{user.description}}
        </p>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Experience</h3>
        <div class="mb-4" *ngFor="let exp of user.experience">
          <h4 class="text-xl font-semibold">{{exp.name}}</h4>
          <p class="text-gray-400">{{exp.period.from}} - {{exp.period.to}}</p>
        </div>
      </div>

      <div class="bg-gray-800 p-6 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Contact</h3>
        <p class="text-gray-400" *ngIf="user.email">Email: {{user.email}}</p>
        <p class="text-gray-400" *ngIf="user.phone">Phone: {{user.phone}}</p>
      </div>
    </div>
    <div *ngIf="showNotFoundUserInfo">
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <h2 class="text-3xl font-semibold mb-4 font-montserrat">User Not Found</h2>
          <p class="text-gray-400 mb-8">Sorry, the requested user could not be found.</p>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {
  userFound = false;
  showNotFoundUserInfo = false;
  user: UserDetailsDto = {
    headerInfo: '',
    company: '',
    skills: [],
    description: '',
    experience: [],
    phone: 0,
    _id: '',
    email: '',
    firstName: '',
    lastName: ''
  }

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private dialog: MatDialog) { }

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    try {
      if (userId) {
        const user = await this.profileService.getUserDetails(userId);
        this.user = user;
        this.userFound = true;
      }
    } catch (err) {
      this.userFound = false;
      this.showNotFoundUserInfo = true;
    }
  }

  openSendMessageModal(): void {
    const dialogRef = this.dialog.open(SendMessageModalComponent, {
      width: '500px',
      height: '450px',
      data: { recipientId: this.user._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}