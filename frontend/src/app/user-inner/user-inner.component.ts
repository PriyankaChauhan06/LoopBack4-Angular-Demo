import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { LanguageFlag } from '../models/languageModel';
import data from '../../assets/json/data.json';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user: any;
  langs: any[] = [];
  private unsubscribe: Subscription[] = [];

  constructor( private translationService: TranslationService ) {}

  ngOnInit(): void {
    this.langs = data.languagesList;
    const usr: any = localStorage.getItem('userDetail');
    this.user = JSON.parse(usr)
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() { localStorage.clear(); document.location.reload() }

  selectLanguage(lang: string) { this.translationService.setLanguage(lang); this.setLanguage(lang); }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) { language.active = true; this.language = language;
      } else { language.active = false; }
    });
  }

  ngOnDestroy() { this.unsubscribe.forEach((sb) => sb.unsubscribe()) }
}
