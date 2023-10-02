import { NgModule } from '@angular/core';
import { ExploreComponent } from './explore.component';
import { CommonControlsModule } from 'src/app/library/commonControls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    imports: [CommonControlsModule, FormsModule, ReactiveFormsModule, MatDividerModule],
    exports: [],
    declarations: [ExploreComponent],
    providers: [],
})
export class ExploreModule { }
