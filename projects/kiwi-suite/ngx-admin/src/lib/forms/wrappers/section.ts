import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
    selector: 'formly-wrapper-section',
    template: `
        <h6><i class="{{ to.icon }}"></i> {{ to.label }}</h6>
        <ng-template #fieldComponent></ng-template>
        <hr>
    `,
})
export class FormlyWrapperSection extends FieldWrapper {
    @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
