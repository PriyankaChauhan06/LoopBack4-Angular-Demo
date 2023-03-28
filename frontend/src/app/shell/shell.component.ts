import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { ShellService, LayoutType } from '../services/shell.service';
import { ShellInitService } from '../services/shell-init.service';
import { LocalStorageService } from '../services/local-storage.service';
import data from '../../assets/json/data.json';
import { Router, ResolveEnd } from '@angular/router';
// import { UserService } from '../user/user.service';
import { Subscription, Observable } from 'rxjs';
import { ToastService } from '../services/message.service';
import { ToggleComponent, ScrollTopComponent, DrawerComponent, StickyComponent,
  MenuComponent, ScrollComponent } from '../theme/components';
import { PageInfoService } from '../services/page-info.service';
import { ThemeModeService, ThemeModeType } from '../services/theme-mode.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  public subs: any  = new Subscription();
  userName = null;
  user: any;
  asideDisplay: boolean;
  footerDisplay: boolean;
  asideCSSClasses: string;
  footerCSSClasses: string;
  headerCSSClasses: string;
  asideTheme: string = '';
  contentClasses: string = '';
  headerMobileClasses: string = '';
  asideMenuCSSClasses: string = '';
  contentContainerClasses: string = '';
  headerContainerCssClasses: string = '';
  asideSelfDisplay: boolean = true;
  asideMenuStatic: boolean = true;
  toolbarDisplay: boolean = true;
  contentExtended:boolean = false;
  asideHTMLAttributes: any = {};
  headerHTMLAttributes: any = {};
  headerMobileAttributes: any = {};
  extrasScrollTopDisplay = false;
  asideMinimize: boolean = false;
  extrasQuickPanelDisplay: boolean = false;
  extrasCartOffcanvasDisplay: boolean = false;
  extrasUserOffcanvasDisplay: boolean = false;
  extrasSearchOffcanvasDisplay: boolean = false;
  extrasNotificationsOffcanvasDisplay: boolean = false;
  extrasQuickActionsOffcanvasDisplay: boolean = false;
  private layoutConfig$: Observable<LayoutType>;
  pageTitleAttributes: {[attrName: string]: string | boolean};
  selfLayout: string = 'default';
  headerLeft: string = 'menu';
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  routes: any[] = [];
  mode$: Observable<ThemeModeType>;
  menuMode$: Observable<ThemeModeType>;

  @Input() toggleBtnClass: string = '';
  @Input() toggleBtnIconClass: string = 'svg-icon-2';
  @Input() menuPlacement: string = 'bottom-end';
  @Input() menuTrigger: string = "{default: 'click', lg: 'hover'}";
  @ViewChild('ktPageTitle', {static: true}) ktPageTitle: ElementRef;
  @ViewChild('ktAsideScroll', { static: true }) ktAsideScroll: ElementRef;
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  constructor(
    private router: Router,
    private toast: ToastService,
    // private userService: UserService,
    private pageInfo: PageInfoService,
    public shellService: ShellService,
    public shellInitService: ShellInitService,
    private modeService: ThemeModeService,
    public localStorageService: LocalStorageService,
  ) { 
    this.routes = data.routList;
    this.shellInitService.init();
    const initPageInfo = () => { setTimeout(() => { this.pageInfo.calculateTitle(); this.pageInfo.calculateBreadcrumbs() }, 10) };
    initPageInfo();
    this.router.events.pipe(filter((event) => event instanceof ResolveEnd)).subscribe(initPageInfo);
  }

  ngOnInit(): void {
    this.setActiveUrl();
    const token: any = localStorage.getItem('userToken');
    // if (token && !this.localStorageService.getFilters('user').userName) { this.getUser(); }
    // this.userName = this.localStorageService.getFilters('user').userName;
    this.viewLayout();

    this.asideTheme = this.shellService.getProp('aside.theme') as string;
    this.asideMinimize = this.shellService.getProp('aside.minimize') as boolean;
    this.asideMenuCSSClasses = this.shellService.getStringCSSClasses('asideMenu');

    this.headerLeft = this.shellService.getProp('header.left') as string;
    this.mode$ = this.modeService.mode.asObservable();
    this.menuMode$ = this.modeService.menuMode.asObservable();
    this.headerContainerCssClasses = this.shellService.getStringCSSClasses('headerContainer');
    this.asideDisplay = this.shellService.getProp('aside.display') as boolean;
    this.headerLeft = this.shellService.getProp('header.left') as string;
    this.pageTitleAttributes = this.shellService.getHTMLAttributes('pageTitle');

    this.layoutConfig$ = this.shellService.layoutConfigSubject.asObservable();
    const layoutUpdateSubscription = this.layoutConfig$.subscribe(() => { this.pluginsInitialization() });
    this.unsubscribe.push(layoutUpdateSubscription);
  }

  switchMode(_mode: ThemeModeType): void { this.modeService.switchMode(_mode); }

  pluginsInitialization() {
    setTimeout(() => { ToggleComponent.bootstrap(); ScrollTopComponent.bootstrap(); DrawerComponent.bootstrap(); 
      StickyComponent.bootstrap(); MenuComponent.bootstrap(); ScrollComponent.bootstrap();
    }, 200);
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization(); DrawerComponent.reinitialization();
      ToggleComponent.reinitialization(); ScrollComponent.reinitialization();
      if (this.ktAsideScroll && this.ktAsideScroll.nativeElement) { this.ktAsideScroll.nativeElement.scrollTop = 0; }
    }, 50);
  }

  minimize() {
    const asideRef = document.getElementById('kt_aside');
    asideRef?.classList.add('animating');
    setTimeout(() => { asideRef?.classList.remove('animating') }, 300);
  }

  setActiveUrl() {
    const activeRoute = this.router.routerState.snapshot['root']?.children[0]?.children[0]?.data;
    this.routes.forEach((ele) => {
      ele.menu.forEach((item: any) => {
        if (item.label === activeRoute.moduleCode) { return item.isActive = true;
        } else { return item.isActive = false; }
      });
    });
  }

  viewLayout() {
    // build view by layout config settings
    this.asideDisplay = this.shellService.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.shellService.getProp('toolbar.display') as boolean;
    this.contentContainerClasses = this.shellService.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.shellService.getStringCSSClasses('aside');
    this.headerCSSClasses = this.shellService.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.shellService.getHTMLAttributes('headerMenu');
  }

  async onNavClick(item: any) {
    this.routes.map((ele) => { ele.menu.map((e: any) => { e.isActive = false }) });
    item.isActive = true;
  }

  // public getUser() {
  //   this.subs.add(this.userService.getUser().subscribe((res: any) => {
  //     this.user = res.result;
  //     this.user['roleName'] = this.user?.role?.name;
  //     this.localStorageService.setFilters('userDetail', this.user);
  //   }, (error) => {
  //     this.toast.showError(error.error.message);
  //   }));
  // }

  public logout() { localStorage.clear(); document.location.reload(); this.router.navigate(['/auth/login']) }

  ngOnDestroy() { this.unsubscribe.forEach((sb: any) => sb.unsubscribe()) }
}
