import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule)
  },
  {
    path: 'restock',
    loadChildren: () => import('./restock/restock.module').then(m => m.RestockModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
