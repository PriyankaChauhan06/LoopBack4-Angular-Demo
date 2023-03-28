import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { CreateProductComponent } from './create-product/create-product.component';

@NgModule({
  declarations: [
    ProductComponent,
    CreateProductComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent },
    ])
  ]
})
export class ProductModule { }
