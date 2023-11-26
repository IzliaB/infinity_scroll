import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPrincipalComponent } from './components/dashboard-principal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardPrincipalComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }