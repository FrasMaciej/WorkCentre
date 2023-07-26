import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    imports: [CommonModule],
    exports: [MatToolbarModule, MatIconModule, MatButtonModule],
    declarations: [],
    providers: [],
})
export class CommonControlsModule { }
