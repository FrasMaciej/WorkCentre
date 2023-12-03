import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SendMessageModalComponent } from '../../conversation/sendMessageModal.component';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';

@Component({
  selector: 'user-profile',
  template: `
    <div *ngIf="!hideButtons" class="button-section ml-2 mb-2">
      <button button mat-raised-button color="accent" (click)="openSendMessageModal()">
        <mat-icon> message</mat-icon>
        Send Message
      </button>
    </div>
    <div *ngIf="userFound" class="profile-container">
      <div class="profile-header">
        <div>
          <h2 class="profile-name">{{user.firstName}} {{user.lastName}}</h2>
          <div class="profile-header-info flex justify-items-center gap-x-2" *ngIf="userDetails?.headerInfo">
            <mat-icon>edit</mat-icon>
            <div>{{userDetails?.headerInfo}}</div>
          </div>
          <div class="profile-company flex justify-items-center gap-x-2 mb-2"  *ngIf="userDetails?.company">
            <mat-icon>work</mat-icon>
            <div>{{userDetails?.company}}</div>
          </div>
          <div class="profile-company flex justify-items-center gap-x-2" *ngIf="userDetails?.location">
            <mat-icon> location_on</mat-icon>
            <div>{{userDetails?.location}}</div>
          </div> 
        </div>
        <img src="assets/avatar_placeholder.jpg" alt="Avatar" class="profile-avatar">
      </div>

      <div class="profile-section" *ngIf="userDetails.profileDescription">
        <h3 class="section-title">Description</h3>
        <p class="section-content">{{userDetails?.profileDescription}}</p>
      </div>

      <div class="profile-section">
        <h3 class="section-title">Skills</h3>
        <div class="skill-list">
          <li class="skill-item gap-y-0-5" *ngFor="let skill of userDetails?.skills" >
            <div class="skill-name">{{skill.name}}</div>
            <div *ngIf="skill?.description" class="skill-description">{{skill.description}}</div>
          </li>
        </div>
      </div>

      <div class="profile-section">
        <h3 class="section-title">Experience</h3>
        <div class="experience-item gap-y-0-5" *ngFor="let exp of userDetails?.experience">
          <div class="experience-name">{{exp.name}}</div>
          <div class="experience-period">{{exp.period.from | date }} - {{exp.period.to | date}}</div>
        </div>
      </div>

      <div class="profile-section">
        <h3 class="section-title">Contact</h3>
        <div class="flex flex-items-center gap-x-2" *ngIf="userDetails?.email">
          <mat-icon>email</mat-icon>
          <div class="contact-info" >{{userDetails.email}}</div>
        </div>
        <div class="flex flex-items-center gap-x-2"  *ngIf="userDetails?.phone">
          <mat-icon>phone</mat-icon>
          <div class="contact-info" >{{userDetails.phone}}</div>
        </div>
      </div>
    </div>
    <div *ngIf="showNotFoundUserInfo" class="not-found-section">
      <div class="not-found-content">
        <h2 class="not-found-title">User Not Found</h2>
        <p class="not-found-message">Sorry, the requested user could not be found.</p>
      </div>
    </div>
    
  `,
  styles: [
    `
    .button-section {
      display: flex;
      margin-bottom: 20px;
    }

    .action-button {
      margin: 0 10px;
      background-color: #007bff;
      color: #fff;
      font-size: 16px;
    }

    .profile-container {
      background-color: #333;
      color: #fff;
      padding: 20px;
      border-radius: 8px;
    }

    .profile-header {
      display: flex;
      justify-content: space-between;
      background-color: #222;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .profile-name {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
      font-family: 'Montserrat', sans-serif;
    }

    .profile-header-info {
      color: white;
      margin-bottom: 5px;
    }

    .profile-company {
      color: white;
    }

    .profile-avatar {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }

    .profile-section {
      background-color: #222;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 10px;
    }

    .section-content {
      color:white;
    }

    .skill-list {
      list-style: none;
    }

    .skill-item {
      margin-bottom: 15px;
    }

    .skill-name {
      font-size: 18px;
      font-weight: 600;
      color: #007bff;
    }

    .skill-description {
      color: white;
    }

    .experience-item {
      margin-bottom: 15px;
    }

    .experience-name {
      font-size: 18px;
      font-weight: 600;
      color: #007bff;
    }

    .experience-period {
      color: white;
    }

    .contact-info {
      color: white;
      margin-bottom: 10px;
    }

    .not-found-section {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .not-found-content {
      text-align: center;
    }

    .not-found-title {
      font-size: 24px;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 20px;
    }

    .not-found-message {
      color: #888;
    }
    `
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
    email: '',
    location: ''
  }

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userContext: LoggedUserService,
    private router: Router
  ) { }

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