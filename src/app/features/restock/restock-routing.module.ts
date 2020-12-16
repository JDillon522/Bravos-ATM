import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestockComponent } from './component/restock.component';

const routes: Routes = [
  {
    path: '',
    component: RestockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestockRoutingModule { }
