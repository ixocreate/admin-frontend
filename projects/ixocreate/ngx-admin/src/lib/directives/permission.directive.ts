import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { canActivateWithPermissions } from '../shared/userCanActivate';
import { ConfigService } from '../services/config.service';

@Directive({
  selector: '[ixoCan]',
})
export class PermissionDirective {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private config: ConfigService) {
  }

  @Input() set ixoCan(abilities: string[]) {
    this.viewContainer.clear();
    if (canActivateWithPermissions(this.config.userPermissions, abilities)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
