import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddOfferModalComponent } from './addOfferModal.component';
import { AddOrganizationModalComponent } from './addOrganizationModal.component';

@NgModule({
    imports: [CommonModule, CommonControlsModule, FormsModule, ReactiveFormsModule,],
    exports: [],
    declarations: [HomeComponent, AddOfferModalComponent, AddOrganizationModalComponent],
    providers: [],
})
export class HomeModule { }
