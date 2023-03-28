import { Injectable } from '@angular/core';
import { Options } from '../models/options';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getFilters(moduleName: string) {
    if (localStorage.getItem(moduleName)) {
      const module = JSON.parse(localStorage.getItem(moduleName)!);
      if (module) return module.options;
    } else { return new Options(); }
  }

  setFilters(moduleName: string , options: any) {
    if (options?.skip) { options.skip = 0; }
    const module = JSON.stringify({ options });
    localStorage.setItem(moduleName, module);
  }
}
