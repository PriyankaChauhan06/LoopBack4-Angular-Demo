import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  public showSuccess(detail: any) {
    console.log('-----------------succ', detail);
    this.messageService.add({severity: 'success', summary: 'Success', detail});
  }

  public showInfo(detail: any) {
    console.log('-----------------info', detail);
    this.messageService.add({severity: 'info', summary: 'Info', detail});
  }

  public showWarn(detail: any) {
    console.log('-----------------war', detail);
    this.messageService.add({severity: 'warn', summary: 'Warning', detail});
  }

  public showError(detail: any) {
    console.log('-----------------err', detail);
    this.messageService.add({severity: 'error', summary: 'Error', detail});
  }

}
