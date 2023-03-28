import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { SharedModule } from './modules/shared.module';
import { ShellComponent } from './shell/shell.component';
import { SpinnerInterceptor } from './interceptors/spinnerOverlay.interceptor';

@NgModule({
  declarations: [AppComponent, ShellComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    // AuthGuard,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: () => () => {}, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
