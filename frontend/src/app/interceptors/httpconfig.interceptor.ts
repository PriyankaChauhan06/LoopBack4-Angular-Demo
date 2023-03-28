import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse,
  HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router, private helperService: HelperService, ) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    const token: any = localStorage.getItem('userToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': token,
          'time-zone': this.helperService.getTimeZone().toString(),
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent < any > ) => {
        if (event instanceof HttpResponse) {}
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/auth/login']); }
        return throwError(error);
      }));
  }

}
