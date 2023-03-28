import { Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/message.service';
import { SaleService } from '../sale.service';
import { Sale } from '../sale.model';
import { ProductService } from 'src/app/product/product.service';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/product/product.model';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.scss']
})
export class CreateSaleComponent implements OnInit, OnDestroy {
  sale: Sale = new Sale();
  subscription = new Subscription();
  displayDialog = false;
  productOption: SelectItem[] = [];
  date = new Date();

  @ViewChild('f' , {static: false}) fd: ElementRef;
  @Output() close: EventEmitter<Sale> = new EventEmitter();

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private toast: ToastService
  ) { }

  ngOnInit() { this.getProductOptionList() }

  showDialog(row: any) {
    this.displayDialog = true;
    if (row.id) {
      this.sale = Object.assign({}, row);
      this.sale.transactionDate = new Date(row.transactionDate)
    } else {
      this.sale = new Sale();
    }
  }

  getProductOptionList() {
    this.subscription.add(this.productService.getProductOptionList().subscribe((response: SelectItem[]) => {
      this.productOption = response.map((e: any) => {
        e.label = e?.name;
        e.value = e?.id;
        delete e?.id
        delete e?.name
        return e
      })
    }, (error) => {
      this.toast.showError(error.error.message);
    }));
  }

  onSubmit(form: any) { (!this.sale.id) ? this.createSale(form) : this.updateSale(form) }

  createSale(form: any) {
    let prepareObj = {
      "quantity": this.sale.quantity,
      "transactionDate": this.sale.transactionDate,
      "productId": this.sale.productId
    }
  
    this.subscription.add(this.saleService.createSale(prepareObj).subscribe((response: Sale) => {
      this.displayDialog = false;
      this.reset(form);
      this.toast.showSuccess(response.message);
      this.close.emit();
    }, (error) => {
      this.reset(form);
      this.toast.showError(error.error.message);
    }));
  }

  updateSale(form: FormData) {
    let prepareObj = {
      "quantity": this.sale.quantity,
      "transactionDate": this.sale.transactionDate,
      "productId": this.sale.productId
    }

    this.subscription.add(this.saleService.updateSale(this.sale.id, prepareObj).subscribe((response: Sale) => {
      this.displayDialog = false;
      this.reset(form);
      this.close.emit();
      this.toast.showSuccess(response.message);
    }, (error) => {
      this.displayDialog = false;
      this.reset(form);
      this.toast.showError(error.error.message);
    }));
  }

  reset(form: any) { form.reset(); form.submitted = false; }

  closeDialog() { this.sale = new Sale(); this.reset(this.fd); }

  ngOnDestroy() { this.subscription.unsubscribe(); }
}
