import { NgModule } from '@angular/core';

import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecruiterPanelComponent } from './recruiterPanel.component';
import { OfferDetailsModalComponent } from './offerDetailsModal.component';
import { CandidatesModalComponent } from './candidatesModal.component';
import { CandidateListItemComponent } from './candidateListItem.component';


@NgModule({
    imports: [CommonControlsModule, FormsModule, ReactiveFormsModule, CommonModule],
    exports: [],
    declarations: [RecruiterPanelComponent, OfferDetailsModalComponent, CandidatesModalComponent, CandidateListItemComponent],
    providers: [],
})
export class RecruiterPanelModule { }
