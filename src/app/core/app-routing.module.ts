import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/overview/overview.module').then(m => m.OverviewModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('../features/withdraw/withdraw.module').then(m => m.WithdrawModule)
  },
  {
    path: 'restock',
    loadChildren: () => import('../features/restock/restock.module').then(m => m.RestockModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../features/admin/admin.module').then(m => m.AdminModule)
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
