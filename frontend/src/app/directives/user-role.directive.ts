import { Directive, TemplateRef, ViewContainerRef, Input, OnInit, } from '@angular/core';

@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
) { }
  userRole: any = {};

  @Input()
    set appUserRole(roles: any) {
    this.userRole.moduleName = roles[0];
    this.userRole.actionName = roles[1];
  }

  ngOnInit() {
    let moduleAction: any;
    this.userRole.data.find((e: any) => {
      if ((e.moduleCode === this.userRole.moduleName) && (e.actionCode === this.userRole.actionName)) { moduleAction = e.isChecked }
    });

    if (moduleAction) {
      if (this.userRole.actionName === 'View-Detail') {
        const ele = document.getElementsByClassName('viewRef') as any ;
        if (ele.length) { for (const iterator of ele) { iterator.classList.add('item') } }
      }
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else { this.viewContainer.clear() }
  }
}
