import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ]),
  ],
})
export class DashboardModule {}
