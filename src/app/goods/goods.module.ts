import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { GoodTableComponent } from './good-table/good-table.component';
import { GoodEditComponent } from './good-edit/good-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GoodTableComponent, GoodEditComponent],
  imports: [
    CommonModule,
    GoodsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GoodsModule { }
