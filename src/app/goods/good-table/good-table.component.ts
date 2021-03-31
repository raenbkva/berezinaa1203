import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MyGood, MyGoodCategory } from 'src/app/shared/modules/mgood.module';
import { MgoodService } from "src/app/shared/services/MgoodService";

@Component({
  selector: 'app-good-table',
  templateUrl: './good-table.component.html',
  styleUrls: ['./good-table.component.css']
})
export class GoodTableComponent implements OnInit {

  constructor(private MgoodService: MgoodService, private router: Router) { }

  goods: MyGood[] = []
  category: string
  MyGoodCategory = MyGoodCategory


  ngOnInit(): void {
    this.getData()
  }

  getCategory(id: number) {
    this.category = (id === this.MyGoodCategory.furniture) ? 'furniture' :
                      (id === this.MyGoodCategory.technology) ? 'technology' :
                      (id === this.MyGoodCategory.books) ? 'books' :
                      (id === this.MyGoodCategory.phones) ? 'phones' :
                      '-';
    return this.category;
  }

  async getData() {
    try {
      let goods = this.MgoodService.getAll();
      this.goods = isNullOrUndefined(await goods) ? [] : await goods;
      console.log(this.goods);      
    } catch (err) {
      console.error(err);
    }
  }

  onAddGood() {
    this.router.navigate([this.router.url, 'edit']);
  }

  onEditGood(id: number) {
    this.router.navigate([this.router.url, 'edit', id]);
  }

  async onDeleteGood(id: number) {
    try {
      await this.MgoodService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async plusAmount(nowGood: MyGood) {
    nowGood.amount = nowGood.amount + 1;
    try {
      await this.MgoodService.putOneById(nowGood.id, nowGood);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async minusAmount(nowGood: MyGood) {
    nowGood.amount = nowGood.amount - 1;
    try {
      await this.MgoodService.putOneById(nowGood.id, nowGood);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }
}
