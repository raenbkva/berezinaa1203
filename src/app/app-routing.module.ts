import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './goods/goods.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: '',
    component: InfoComponent
  },
  {
    path: 'goods',
    loadChildren: () =>
      import('./goods/goods.module').then((m) => m.GoodsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
