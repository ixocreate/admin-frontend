import {Component, OnDestroy, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {Observable, of} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {DataStoreService} from '../../services';

export class SelectOption {
    label: string;
    value?: any;
    group?: SelectOption[];
    disabled?: boolean;

    [key: string]: any;

    constructor(label: string, value?: any, children?: SelectOption[]) {
        this.label = label;
        this.value = value;
        this.group = children;
    }
}

/**
 * see https://github.com/ng-select/ng-select
 *
 * TODO: add more ng-select options
 */

@Component({
    selector: 'formly-field-select',
    template: `
        <ng-select [items]="selectOptions$ | async"
                   [bindValue]="valueProp"
                   [bindLabel]="labelProp"
                   [clearable]="clearable"
                   [multiple]="multiple"
                   [formControl]="formControl">
        </ng-select>
    `,
})
export class FormlyFieldSelect extends FieldType implements OnInit, OnDestroy {

    selectOptions$: Observable<any>;
    private destroyed$ = new ReplaySubject<boolean>(1);

    public constructor(private dataStore: DataStoreService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.to.resource) {
            this.dataStore.resource(this.to.resource).load();
        }
        this.selectOptions$ = this.getSelectOptions();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log(changes);
    // }

    get labelProp(): string {
        return this.to.labelProp || 'label';
    }

    get valueProp(): string {
        /**
         * ng-select allows null to use object as value -> allow false as valueProp binding
         */
        if (this.to.valueProp === false) {
            return null;
        }
        return this.to.valueProp || 'value';
    }

    get groupProp(): string {
        return this.to.groupProp || 'group';
    }

    get clearable() {
        return this.to.clearable;
    }

    get multiple() {
        return this.to.multiple || false;
    }

    private getSelectOptions(): Observable<any[]> {
        if (this.to.resource) {
            return this.dataStore.resource(this.to.resource).models$.pipe(takeUntil(this.destroyed$));
        } else if (!(this.to.options instanceof Observable)) {
            const options: SelectOption[] = [],
                groups: { [key: string]: SelectOption[] } = {};
            this.to.options.map((option: SelectOption) => {
                if (!option[this.groupProp]) {
                    options.push(option);
                } else {
                    if (groups[option[this.groupProp]]) {
                        groups[option[this.groupProp]].push(option);
                    } else {
                        groups[option[this.groupProp]] = [option];
                        options.push({
                            label: option[this.groupProp],
                            group: groups[option[this.groupProp]],
                        });
                    }
                }
            });
            return of(options);
        } else {
            // return observable directly
            return this.to.options;
        }
    }
}
