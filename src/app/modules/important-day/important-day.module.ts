import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { IMPORTANT_ROUTES } from './important.routing';

import { DayComponent } from './components/day/day.component';
import { DayEditComponent } from './components/day-edit/day-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DayComponent,
    DayEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IMPORTANT_ROUTES),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ImportantDayModule { }
