import { Injectable } from '@angular/core';
import { ILayout } from '../../assets/config/default-shell.config';
import { ShellService } from './shell.service';

@Injectable({
  providedIn: 'root',
})
export class ShellInitService {
  constructor(private shellService: ShellService) {}

  init() { this.shellService.initConfig(); this.initHeader(); this.initAside(); }

  update(fieldsToUpdate: Partial<ILayout>) {
    this.shellService.updateConfig(fieldsToUpdate);
    this.initHeader();
    this.initAside();
  }

  private initHeader() {
    this.shellService.setCSSClass(
      'headerContainer',
      this.shellService.getProp('header.width') === 'fluid'
        ? 'container-fluid'
        : 'container-xxl'
    );

    const fixedDesktop = this.shellService.getProp('header.fixed.desktop') as boolean;
    if (fixedDesktop) {
      document.body.classList.add('header-fixed');
    }

    const tabletAndMobile = this.shellService.getProp(
      'header.fixed.tabletAndMobile'
    ) as boolean;
    if (tabletAndMobile) {
      document.body.classList.add('header-tablet-and-mobile-fixed');
    }
  }

  private initAside() {
    const display = this.shellService.getProp('aside.display') as boolean;
    if (!display) {
      return;
    }

    // Enable Aside
    document.body.classList.add('aside-enabled');
    const theme = this.shellService.getProp('aside.theme') as string;
    this.shellService.setCSSClass('aside', `aside-${theme}`);
    const fixed = this.shellService.getProp('aside.fixed') as boolean;
    if (fixed) {
      document.body.classList.add('aside-fixed');
    }

    const minimized = this.shellService.getProp('aside.minimized') as boolean;
    if (minimized) {
      document.body.setAttribute('data-kt-aside-minimize', 'on');
    }

    // Hoverable on minimize
    const hoverable = this.shellService.getProp('aside.hoverable') as boolean;
    if (hoverable) {
      this.shellService.setCSSClass('aside', `aside-hoverable`);
    }
  }
}
