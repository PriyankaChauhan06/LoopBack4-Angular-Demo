import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePageService {

  changePage(event: any, options: any) {
    options.limit = event.pageSize;
    if (event.pageIndex === 0 && event.previousPageIndex === 0) {
      options.skip = 0;
    } else {
      if (event.pageIndex > event.previousPageIndex) {
        options.skip = ((event.pageIndex - 1) * event.pageSize) + event.pageSize;
      } else {
        if (event.previousPageIndex === 1) {
          options.skip = 0;
        } else {
          options.skip = (event.previousPageIndex - 1) * event.pageSize ;
        }
      }
    }

    return options;
  }
}
