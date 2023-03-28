import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Sale } from './sale.model';
import { Options } from 'src/app/models/options';
import { SaleService } from './sale.service';
import { ToastService } from 'src/app/services/message.service';
import { ChangePageService } from 'src/app/services/change-page.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { HelperService } from '../services/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Id', 'ProductId', 'ProductName', 'Quantity', 'ItemPrice', 'TransactionDate', 'Action'];
  sale: Sale = new Sale();
  frm: FormData = new FormData();
  options: Options = new Options();
  isSearchLoading = false;
  searchTerm$ = new Subject<string>();
  subscription = new Subscription();
  @ViewChild(CreateSaleComponent, { static: true }) createSale: CreateSaleComponent;

  constructor(
    private localStorageService: LocalStorageService,
    private changePageService: ChangePageService,
    private changeDetectorRef: ChangeDetectorRef,
    private saleService: SaleService,
    public helperService: HelperService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.options = this.localStorageService.getFilters('sale');
    this.getSaleList();
  }

  getSaleList() {
    this.subscription.add(this.saleService.getSaleList().subscribe((response: Sale[]) => {
      response.map((e) => {
        e.itemPrice = e?.product?.price;
        e.productPerSale = (e?.itemPrice && e?.quantity) ? (e?.itemPrice * e?.quantity) : 0;
        return e;
      })
      this.sale = response;
      this.sale.count = response.length;
      this.localStorageService.setFilters('sale', this.options);
      this.changeDetectorRef.detectChanges();
    }, error => {
      this.toast.showError(error.error.message);
    }));
  }

  resetFilters() {
    this.options = new Options();
    this.localStorageService.setFilters('sale', this.options);
    this.sale = new Sale();
    this.getSaleList();
  }

  onEnter() { setTimeout(() => { this.isSearchLoading = true; }, 800); this.isSearchLoading = false; }

  showDialog(row: any) { this.createSale.showDialog(row); }

  changePage(event: any) { this.options = this.changePageService.changePage(event, this.options); this.getSaleList(); }

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
        this.subscription.add(this.saleService.deleteSale(row.id).subscribe((response: Sale) => {
          this.toast.showSuccess(response.message);
          this.getSaleList();
        }, (error) => {
          this.toast.showError(error.error.message);
        }));
      }
    });
  }

  ngOnDestroy() { this.subscription.unsubscribe() }
}

