import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Observable, Subscription } from 'rxjs';
import { Product } from './product.model';
import { Options } from 'src/app/models/options';
import { ProductService } from './product.service';
import { ToastService } from 'src/app/services/message.service';
import { ChangePageService } from 'src/app/services/change-page.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { HelperService } from '../services/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Id', 'Name', 'Price', 'Description', 'Action'];
  product: Product = new Product();
  frm: FormData = new FormData();
  options: Options = new Options();
  isSearchLoading = false;
  searchTerm$ = new Subject<string>();
  subscription = new Subscription();
  @ViewChild(CreateProductComponent, { static: true }) createProduct: CreateProductComponent;

  constructor(
    private localStorageService: LocalStorageService,
    private changePageService: ChangePageService,
    private changeDetectorRef: ChangeDetectorRef,
    private productService: ProductService,
    public helperService: HelperService,
    private toast: ToastService,
  ) { this.search(this.searchTerm$); }

  ngOnInit() {
    this.options = this.localStorageService.getFilters('product');
    this.getProductList();
  }

  getProductList() {
    this.subscription.add(this.productService.getProductList(this.options).subscribe((response: Product) => {
      this.product = response;
      this.product.count = response.length;
      this.localStorageService.setFilters('product', this.options);
      this.changeDetectorRef.detectChanges();
    }, error => {
      this.toast.showError(error.error.message);
    }));
  }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(600),
      distinctUntilChanged(),
      switchMap((term) => {
        return this.productService.getProductList({ search: term });
      })).subscribe((response: Product) => {
        this.isSearchLoading = false;
        this.product = response;
        this.product.count = response.length;
        this.localStorageService.setFilters('product' , this.options);
      }, error => {
        this.isSearchLoading = false;
        this.toast.showError(error.error.message);
      });
  }

  clearSearch(search: any) { search.value = null; this.options.search = ''; this.getProductList() }

  resetFilters() {
    this.options = new Options();
    this.localStorageService.setFilters('product', this.options);
    this.product = new Product();
    this.getProductList();
  }

  onEnter() { setTimeout(() => { this.isSearchLoading = true; }, 800); this.isSearchLoading = false; }

  showDialog(row: any) { this.createProduct.showDialog(row); }

  changePage(event: any) { this.options = this.changePageService.changePage(event, this.options); this.getProductList(); }

  delete(row: any) {
    Swal.fire({
      title: 'Are you sure that you want to delete this record?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go!'
    }).then((result) => {
      if (result.value) {
        this.subscription.add(this.productService.deleteProduct(row.id).subscribe((response: Product) => {
          this.toast.showSuccess(response.message);
          this.getProductList();
        }, (error) => {
          this.toast.showError(error.error.message);
        }));
      }
    });
  }

  ngOnDestroy() { this.subscription.unsubscribe() }
}
