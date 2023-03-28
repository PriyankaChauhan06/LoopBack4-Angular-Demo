import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaleComponent } from './sale.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [SaleComponent, CreateSaleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SaleComponent },
    ])
  ],
})
export class SaleModule { }
