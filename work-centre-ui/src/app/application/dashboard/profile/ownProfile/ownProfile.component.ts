import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { MatDialog } from '@angular/material/dialog';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';
import { EditMainDataModalComponent } from './editMainDataModal.component';
import { EditSkillsModalComponent } from './editSkillsModal.component';
import { EditContactModalComponent } from './editContactModal.component';
import { EditExperienceModalComponent } from './editExperienceModal.component';
import { EditProfileDescriptionModalComponent } from './editProfileDescriptionModal.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'own-profile',
  template: `
    <div *ngIf="userFound" class="profile-container">
      <div class="background">
        <div class="profile-header">
          <div>
            <h2 class="profile-name">{{user.firstName}} {{user.lastName}}</h2>
            <p class="profile-header-info">{{userDetails?.headerInfo}}</p>
            <p class="profile-company">{{userDetails?.company}}</p>
          </div>
          <img src="assets/avatar_placeholder.jpg" alt="Avatar" class="profile-avatar">
        </div>
        <div class="flex justify-end mt-4">
          <button mat-raised-button color="basic" (click)="modifyProfileField('main')" class="text-xl">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
        </div>
      </div>

      <div class="background">
        <div class="profile-section">
          <h3 class="section-title">Description</h3>
          <p class="section-content">{{userDetails?.profileDescription}}</p>
        </div>
        <div class="flex justify-end">
          <button mat-raised-button color="basic" (click)="modifyProfileField('profileDescription')" class="text-xl">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
        </div>
      </div>

      <div class="background">
        <div class="profile-section">
          <h3 class="section-title">Skills</h3>
          <div class="skill-list">
            <li class="skill-item" *ngFor="let skill of userDetails?.skills">
              <div class="skill-name">{{skill.name}}</div>
              <div *ngIf="skill?.description" class="skill-description">{{skill.description}}</div>
            </li>
          </div>
        </div>
        <div class="flex justify-end">
          <button mat-raised-button color="basic" (click)="modifyProfileField('skills')" class="text-xl">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
        </div>
      </div>

      <div class="background">
        <div class="profile-section">
          <h3 class="section-title">Experience</h3>
          <div class="experience-item" *ngFor="let exp of userDetails?.experience">
            <h4 class="experience-name">{{exp.name}}</h4>
            <p class="experience-period">{{exp.period.from | date }} - {{exp.period.to | date}}</p>
          </div>
        </div>
        <div class="flex justify-end">
          <button mat-raised-button color="basic" (click)="modifyProfileField('experience')" class="text-xl">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
        </div>
      </div>

      <div class="background">
        <div class="profile-section">
          <h3 class="section-title">Contact</h3>
          <p class="contact-info" *ngIf="userDetails?.email">Email: {{userDetails.email}}</p>
          <p class="contact-info" *ngIf="userDetails?.phone">Phone: {{userDetails.phone}}</p>
        </div>
        <div class="flex justify-end">
          <button mat-raised-button color="basic" (click)="modifyProfileField('contact')" class="text-xl">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
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
  styles: [`
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
      border-radius: 8px;
    }

    .background {
      background-color: #222;
      margin-bottom: 20px;
      padding: 20px;
    }

    .profile-name {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
      font-family: 'Montserrat', sans-serif;
    }

    .profile-header-info {
      color: #888;
      margin-bottom: 5px;
    }

    .profile-company {
      color: #888;
    }

    .profile-avatar {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }

    .profile-section {
      background-color: #222;
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
      color: #888;
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
      color: #888;
    }

    .experience-item {
      margin-bottom: 15px;
    }

    .experience-name {
      font-size: 18px;
      font-weight: 600;
    }

    .experience-period {
      color: #888;
    }

    .contact-info {
      color: #888;
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

  `]
})

export class OwnProfileComponent implements OnInit {
  userFound = false;
  showNotFoundUserInfo = false;
  user: UserInfoDto = {
    _id: '',
    email: '',
    firstName: '',
    lastName: ''
  };
  userDetails: UserDetails = {
    headerInfo: '',
    company: '',
    skills: [],
    profileDescription: '',
    experience: [],
    phone: 0,
    email: ''
  };
  sections = [
    { title: 'Description', field: 'profileDescription', type: 'text' },
    { title: 'Skills', field: 'skills', type: 'list' },
    { title: 'Experience', field: 'experience', type: 'list' },
    { title: 'Contact', field: 'email', type: 'text' }
  ];

  constructor(private profileService: ProfileService, private dialog: MatDialog, private userContext: LoggedUserService) { }

  async ngOnInit() {
    try {
      this.getUserData();
    } catch (err) {
      this.userFound = false;
      this.showNotFoundUserInfo = true;
    }

    this.dialog.afterAllClosed.subscribe(result => {
      this.getUserData();
    });
  }

  async modifyProfileField(field: string) {
    try {
      const modalComponent = this.getModalComponent(field);
      const dialogRef = this.dialog.open(modalComponent, {
        data: { user: { ...this.user }, userDetails: { ...this.userDetails } }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getUserData();
      });
    } catch (error) {
      console.error('Error modifying profile field:', error);
    }
  }

  getModalComponent(field: string): ComponentType<any> {
    switch (field) {
      case 'main':
        return EditMainDataModalComponent;
      case 'skills':
        return EditSkillsModalComponent;
      case 'profileDescription':
        return EditProfileDescriptionModalComponent;
      case 'experience':
        return EditExperienceModalComponent;
      case 'contact':
        return EditContactModalComponent;
      default:
        throw new Error(`Invalid field: ${field}`);
    }
  }

  async getUserData() {
    const userId = this.userContext.id;
    if (userId) {
      const user = await this.profileService.getUserDetails(userId);
      this.user = user.primary;
      this.userDetails = user.details;
      this.userFound = true;
    }
  }
}