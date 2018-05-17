import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from '../../../../services';
import {PermissionGuard} from '../../guards';

@Directive({
    selector: '[can]'
})
export class PermissionDirective {

    /**
     * from: https://juristr.com/blog/2018/02/angular-permission-directive/
     */
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permissionGuard: PermissionGuard,
        private accountService: AccountService,
    ) {
    }

    @Input()
    set can(abilities: string[]) {
        this.accountService.user$.subscribe(user => {
            this.viewContainer.clear();
            if (this.permissionGuard.can(user, abilities)) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        });
    }
}
