import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'day',
    pathMatch: 'full'
  },
  {
    path: 'day',
    loadChildren: () => import('./modules/important-day/important-day.module.js')
      .then(m => m.ImportantDayModule),
  },
  {
    path: '**',
    redirectTo: 'day',
    pathMatch: 'full'
  }
];

