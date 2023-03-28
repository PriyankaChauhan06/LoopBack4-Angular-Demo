import { Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/message.service';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  product: Product = new Product();
  subscription = new Subscription();
  displayDialog = false;

  @ViewChild('f' , {static: false}) fd: ElementRef;
  @Output() close: EventEmitter<Product> = new EventEmitter();

  constructor( private productService: ProductService, private changeDetectorRef: ChangeDetectorRef, private toast: ToastService ) { }

  ngOnInit() {}

  showDialog(row: any) {
    this.displayDialog = true;
    this.product = (row.id) ? Object.assign({}, row) : new Product();
  }

  onSubmit(form: any) { (!this.product.id) ? this.createProduct(form) : this.updateProduct(form) }

  createProduct(form: any) {
    this.subscription.add(this.productService.createProduct(this.product).subscribe((response: Product) => {
      this.displayDialog = false;
      this.reset(form);
      this.toast.showSuccess(response.message);
      this.close.emit();
    }, (error) => {
      this.reset(form);
      this.toast.showError(error.error.message);
    }));
  }

  updateProduct(form: FormData) {
    this.subscription.add(this.productService.updateProduct(this.product.id, this.product).subscribe((response: Product) => {
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

  closeDialog() { this.product = new Product(); this.reset(this.fd); }

  ngOnDestroy() { this.subscription.unsubscribe(); }
}
