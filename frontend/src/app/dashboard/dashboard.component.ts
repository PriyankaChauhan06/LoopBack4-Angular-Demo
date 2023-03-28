import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product/product.service';
import { HelperService } from '../services/helper.service';
import { Options } from 'src/app/models/options';
import { Product } from '../product/product.model';
import { ToastService } from '../services/message.service';
import { SaleService } from '../sale/sale.service';
import { Sale } from '../sale/sale.model';
import { ChangePageService } from '../services/change-page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['SaleId', 'ProductName', 'Quantity', 'ItemPrice', 'ProductPerSale'];
  sale: Sale = new Sale();
  options: Options = new Options();
  subscription = new Subscription();
  productCount: number = 0
  isSearchLoading = false;
  data: any;
  chartOptions: any;
  chartNameList: string[] = [];
  chartDataList: number[] = [];
  totalSale: number = 0;

  constructor(
    public helperService: HelperService,
    private productService: ProductService,
    private saleService: SaleService,
    private toast: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
    private changePageService: ChangePageService,
  ) { }

  ngOnInit() {
    this.getProductLength();
    this.getSaleList();
    this.chart();
  }

  getProductLength() {
    this.subscription.add(this.productService.getProductList(this.options).subscribe((response: Product) => {
      this.productCount = response.length;
      this.changeDetectorRef.detectChanges();
    }, error => {
      this.toast.showError(error.error.message);
    }));
  }

  getSaleList() {
    this.subscription.add(this.saleService.getSaleList().subscribe((response: Sale[]) => {
      response.map((e) => {
        this.chartNameList.push(e?.product?.name)
        e.itemPrice = e?.product?.price;
        e.productPerSale = (e?.itemPrice && e?.quantity) ? (e?.itemPrice * e?.quantity) : 0;
        this.chartDataList.push(e?.productPerSale)
        return e;
      })
      this.totalSale = this.chartDataList.reduce((partialSum, a) => partialSum + a, 0);
      this.sale = this.sale.rows = response;
      this.sale.count = response.length;
      this.changeDetectorRef.detectChanges();
    }, error => {
      this.toast.showError(error.error.message);
    }));
  }

  chart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
        labels: this.chartNameList,
        datasets: [
            {
                data: this.chartDataList,
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--orange-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--orange-400')]
            }
        ]
    };

    this.chartOptions = { plugins: { legend: { labels: { usePointStyle: true, color: textColor }}} };
  }

  onEnter() { setTimeout(() => { this.isSearchLoading = true; }, 800); this.isSearchLoading = false; }

  changePage(event: any) { this.options = this.changePageService.changePage(event, this.options); this.getSaleList(); }

  ngOnDestroy() {}
}
