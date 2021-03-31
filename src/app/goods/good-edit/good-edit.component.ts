import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyGood, MyGoodCategory } from 'src/app/shared/modules/mgood.module';
import { MgoodService } from 'src/app/shared/services/MgoodService';

@Component({
  selector: 'app-good-edit',
  templateUrl: './good-edit.component.html',
  styleUrls: ['./good-edit.component.css']
})
export class GoodEditComponent implements OnInit {

  id: number;
  good: MyGood;
  goodForm: FormGroup;
  MyGoodCategory = MyGoodCategory;

  constructor(private activatedRoute: ActivatedRoute, private MgoodService: MgoodService, private router: Router) {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.getData();
    this.goodForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/\S/)]),
      vendorcode: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern(/\d/)]),
      procreator: new FormControl(null),
      category: new FormControl(null, Validators.required),
      weight: new FormControl(null, [Validators.required, Validators.pattern(/\d/)]),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9][0-9]*$/)])
    });
  }

  async getData() {
    if (this.id > 0) {
      try {
        let good = this.MgoodService.getOneById(this.id);
        this.good = await good;
      } catch (err) {
        console.error(err);
      }
      this.goodForm.patchValue({
        name: this.good.name,
        vendorcode: this.good.vendorcode,
        price: this.good.price,
        procreator: this.good.procreator,
        category: this.good.category,
        weight: this.good.weight,
        amount: this.good.amount,
      });
    }
  }

  async onSave() {
    if (this.id > 0) {
      try {
        await this.MgoodService.putOneById(this.id, this.goodForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.MgoodService.postOne(this.goodForm.value);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
    this.router.navigate(['/goods']);
  }

  async onDelete() {
    try {
      await this.MgoodService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/goods']);
  }

}
