import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appActionRole]'
})
export class ActionRoleDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }
  userRole: any = {};

  @Input()
    set appActionRole(roles: any) {
    this.userRole.moduleName = roles[0];
  }

  ngOnInit() {
    let editAction: any;
    let deleteAction: any;
    let viewAction: any;
    this.userRole.data.find((e: any) => {
      if (e.moduleCode === this.userRole.moduleName) {
        if (e.actionCode === 'Edit') { editAction = e.isChecked }
        if (e.actionCode === 'Delete') { deleteAction = e.isChecked }
        if (e.actionCode === 'View') { viewAction = e.isChecked }
      }
    });
    
    if (viewAction || editAction || deleteAction) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    } else { this.viewContainer.clear() }
  }
}
