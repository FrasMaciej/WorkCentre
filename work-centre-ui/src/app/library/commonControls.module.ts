import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
    imports: [CommonModule, AngularSvgIconModule.forRoot()],
    exports: [MatButtonModule, MatToolbarModule, MatIconModule, AngularSvgIconModule, MatFormFieldModule],
    declarations: [],
    providers: [],
})
export class CommonControlsModule { }
