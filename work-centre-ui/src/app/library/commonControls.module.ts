import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [AngularSvgIconModule.forRoot()],
    exports: [
        MatButtonModule, MatToolbarModule, MatIconModule, AngularSvgIconModule,
        MatFormFieldModule, MatInputModule, MatCardModule, MatListModule,
        MatSelectModule, MatPaginatorModule, MatMenuModule, MatDialogModule,
        MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule,
        NgxMatSelectSearchModule
    ],
    declarations: [],
})
export class CommonControlsModule { }
