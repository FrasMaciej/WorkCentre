import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SendMessageModalComponent } from '../../conversation/sendMessageModal.component';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Component({
  selector: 'user-profile',
  template: `
    <div *ngIf="!hideButtons">
      <button mat-flat-button (click)="openSendMessageModal()" class="mb-2 ml-2 ">Send Message</button>
      <button mat-flat-button class="mb-2 ml-2 ">Send Invitation to friends</button>
    </div>
    <div *ngIf="userFound" class="container mx-auto p-8 bg-gray-900 text-white">
      <div class="flex items-center justify-between bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <div>
          <h2 class="text-3xl font-semibold mb-2 font-montserrat">{{user.firstName}} {{user.lastName}}</h2>
          <p class="text-gray-400">{{userDetails?.headerInfo}}</p>
          <p class="text-gray-400">{{userDetails?.company}}</p>
        </div>
        <img src="assets/avatar_placeholder.jpg" alt="Avatar" class="rounded-full w-16 h-16">
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Description</h3>
        <p class="text-gray-400">
          {{userDetails?.profileDescription}}
        </p>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Skills</h3>
        <ul class="flex flex-col">
          <li class=" text-white flex flex-col" *ngFor="let skill of userDetails?.skills">
            <div class="text-blue font-medium text-lg">{{skill.name}}</div>
            <div *ngIf="skill?.description">{{skill.description}}</div>
          </li>
        </ul>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Experience</h3>
        <div class="mb-4" *ngFor="let exp of userDetails?.experience">
          <h4 class="text-xl font-semibold">{{exp.name}}</h4>
          <p class="text-gray-400">{{exp.period.from | date }} - {{exp.period.to | date}}</p>
        </div>
      </div>

      <div class="bg-gray-800 p-6 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Contact</h3>
        <p class="text-gray-400" *ngIf="userDetails?.email">Email: {{userDetails.email}}</p>
        <p class="text-gray-400" *ngIf="userDetails?.phone">Phone: {{userDetails.phone}}</p>
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
  hideButtons = false;
  user: UserInfoDto = {
    _id: '',
    email: '',
    firstName: '',
    lastName: ''
  }
  userDetails: UserDetails = {
    headerInfo: '',
    company: '',
    skills: [],
    profileDescription: '',
    experience: [],
    phone: 0,
    email: ''
  }

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userContext: LoggedUserService,
    private router: Router) { }

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    try {
      if (userId) {
        const user = await this.profileService.getUserDetails(userId);
        this.user = user.primary;
        this.userDetails = user.details;
        this.userFound = true;
      }
      if (userId === this.userContext.id) {
        this.router.navigate(['dashboard', 'profile', 'me']);
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