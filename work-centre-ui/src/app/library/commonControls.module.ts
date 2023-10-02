import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';




@NgModule({
    imports: [CommonModule, AngularSvgIconModule.forRoot()],
    exports: [MatButtonModule, MatToolbarModule, MatIconModule, AngularSvgIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatListModule, DatePipe, BrowserModule],
    declarations: [],
    providers: [],
})
export class CommonControlsModule { }
