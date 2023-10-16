import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { MatDialog } from '@angular/material/dialog';
import { LoggedUserService } from 'src/app/commonServices/userContext.service';
import { EditMainDataModalComponent } from './editMainDataModal.component';
import { EditSkillsModalComponent } from './editSkillsModal.component';
import { EditContactModalComponent } from './editContactModal.component';
import { EditExperienceModalComponent } from './editExperienceModal.component';
import { EditProfileDescriptionModalComponent } from './editProfileDescriptionModal.component';

@Component({
  selector: 'own-profile',
  template: `
    <div class="mb-2 ml-1 font-medium text-xl">This is your profile</div>
    <div *ngIf="userFound" class="container mx-auto p-8 bg-gray-900 text-white">
      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-3xl font-semibold mb-2 font-montserrat">{{user.firstName}} {{user.lastName}}</h2>
            <p class="text-gray-400">{{userDetails?.headerInfo}}</p>
            <p class="text-gray-400">{{userDetails?.company}}</p>
          </div>
          <img src="assets/avatar_placeholder.jpg" alt="Avatar" class="rounded-full w-16 h-16">
        </div>
        <button class="btn btn-primary" (click)="modifyProfileField('main')">Edit</button>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Description</h3>
        <p class="text-gray-400">
          {{userDetails?.profileDescription}}
        </p>
        <button class="btn btn-primary" (click)="modifyProfileField('profileDescription')">Edit</button>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Skills</h3>
        <ul class="flex flex-col">
          <li class=" text-white flex flex-col" *ngFor="let skill of userDetails?.skills">
            <div class="text-blue font-medium text-lg">{{skill.name}}</div>
            <div *ngIf="skill?.description">{{skill.description}}</div>
          </li>
        </ul>
        <button class="btn btn-primary" (click)="modifyProfileField('skills')">Edit</button>
      </div>

      <div class="bg-gray-800 p-6 mb-8 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Experience</h3>
        <div class="mb-4" *ngFor="let exp of userDetails?.experience">
          <h4 class="text-xl font-semibold">{{exp.name}}</h4>
          <p class="text-gray-400">{{exp.period.from | date }} - {{exp.period.to | date }}</p>
        </div>
        <button class="btn btn-primary" (click)="modifyProfileField('experience')">Edit</button>
      </div>

      <div class="bg-gray-800 p-6 rounded-md shadow-md">
        <h3 class="text-2xl font-semibold mb-4 font-montserrat">Contact</h3>
        <p class="text-gray-400" *ngIf="userDetails?.email">Email: {{userDetails.email}}</p>
        <p class="text-gray-400" *ngIf="userDetails?.phone">Phone: {{userDetails.phone}}</p>
        <button class="btn btn-primary" (click)="modifyProfileField('contact')">Edit</button>
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
  styles: [`
        .cell-size {
            height: 25px;
            width: 80px;
        }
    `]
})

export class OwnProfileComponent implements OnInit {
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

  constructor(private profileService: ProfileService, private dialog: MatDialog, private userContext: LoggedUserService) { }

  async ngOnInit() {
    const userId = this.userContext.id;
    try {
      if (userId) {
        const user = await this.profileService.getUserDetails(userId);
        this.user = user.primary;
        this.userDetails = user.details;
        this.userFound = true;
      }
    } catch (err) {
      this.userFound = false;
      this.showNotFoundUserInfo = true;
    }
  }

  async modifyProfileField(field: string) {
    try {
      switch (field) {
        case 'main':
          this.dialog.open(EditMainDataModalComponent, {
            data: {
              user: { ...this.user },
              userDetails: { ...this.userDetails },
            }
          });
          break;
        case 'skills':
          this.dialog.open(EditSkillsModalComponent, {
            data: {
              user: { ...this.user },
              userDetails: { ...this.userDetails },
            }
          });
          break;
        case 'profileDescription':
          this.dialog.open(EditProfileDescriptionModalComponent, {
            data: {
              user: { ...this.user },
              userDetails: { ...this.userDetails },
            }
          });
          break;
        case 'experience':
          this.dialog.open(EditExperienceModalComponent, {
            data: {
              user: { ...this.user },
              userDetails: { ...this.userDetails },
            }
          });
          break;
        case 'contact':
          this.dialog.open(EditContactModalComponent, {
            data: {
              user: { ...this.user },
              userDetails: { ...this.userDetails },
            }
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error modifying profile field:', error);
    }
  }

}