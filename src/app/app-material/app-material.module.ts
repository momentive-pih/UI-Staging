import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTableModule } from '@angular/material/table';


@NgModule({
     imports : [
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatRadioModule,
         MatTableModule
    ],
     exports : [
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTableModule
    ]
 })
export class AppMaterialModule { }
