import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { SvgIconComponent } from './svgIconComponent.component';


@NgModule({
    imports: [CommonModule],
    exports: [MatToolbarModule, MatIconModule, MatButtonModule, SvgIconComponent],
    declarations: [SvgIconComponent],
    providers: [],
})
export class CommonControlsModule { }
