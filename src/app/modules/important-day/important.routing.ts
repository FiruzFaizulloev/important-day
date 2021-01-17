import { Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';
import { DayEditComponent } from './components/day-edit/day-edit.component';

export const IMPORTANT_ROUTES: Routes = [
  {
    path: '',
    component: DayComponent
  },
  {
    path: ':mode/:id',
    component: DayEditComponent
  }
];
