import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '', component: ShellComponent, children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {  moduleCode: 'Dashboard' } },
      { path: 'sale', loadChildren: () => import('./sale/sale.module').then((m) => m.SaleModule),
        data: {  moduleCode: 'Sale' } },
      { path: 'product', loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
        data: {  moduleCode: 'Product' } },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [QuicklinkModule, RouterModule.forRoot(routes, {preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
