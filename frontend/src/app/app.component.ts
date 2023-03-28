import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from './services/translation.service';
import { LocalStorageService } from './services/local-storage.service';
import { ToastService } from './services/message.service';
// import { UserService } from './user/user.service';
// import { User } from './user/user.model';

// language list
import { locale as enLang } from '../assets/vocabs/en';
import { locale as chLang } from '../assets/vocabs/ch';
import { locale as esLang } from '../assets/vocabs/es';
import { locale as jpLang } from '../assets/vocabs/jp';
import { locale as deLang } from '../assets/vocabs/de';
import { locale as frLang } from '../assets/vocabs/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Appointment-tracker';
  subs = new Subscription();
  // user: User = new User();

  constructor(
    private translationService: TranslationService,
    private router: Router,
    private toast: ToastService,
    // private userService: UserService,
    private localStorageService: LocalStorageService
  ) { this.translationService.loadTranslations( enLang, chLang, esLang, jpLang, deLang, frLang ) }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {}
      else if ( event instanceof NavigationEnd || event instanceof NavigationCancel) {}
    });
    const token: any = localStorage.getItem('userToken');
    if (token && !window.location.href.includes('html')) {
      // this.getUser();
    }
  }

  // getUser() {
  //   this.subs.add(this.userService.getUser().subscribe((res: any) => {
  //     this.user = res.result;
  //     this.user['roleName'] = this.user?.roleName;
  //     this.localStorageService.setFilters('userDetail', this.user);
  //   }, (error) => {
  //     this.toast.showError(error.error.message);
  //   }));
  // }
}
