import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    title: 'Exchnage Rates',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
