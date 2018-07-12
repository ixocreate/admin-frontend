import {Component, OnDestroy, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {Observable, of} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {DataStoreService} from '../../services';
import {ResourceListModel} from "../../models/api.model";

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
        <ng-container *ngIf="selectOptions$ | async as selectOptions">
            <ng-select 
                        *ngIf="selectOptions.items"
                       [items]="selectOptions.items"
                       [bindValue]="valueProp"
                       [bindLabel]="labelProp"
                       [clearable]="clearable"
                       [multiple]="multiple"
                       [formControl]="formControl">
            </ng-select>
        </ng-container>
        
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
            this.dataStore.resource(this.to.resource.resource).loadListData();
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
        const defaultLabel = this.to.labelProp || 'label';
        return (this.to.resource) ? this.to.resource.label : defaultLabel;
    }

    get valueProp(): string {
        const defaultValue = this.to.valueProp || 'value';
        return (this.to.resource) ? this.to.resource.value : defaultValue;
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

    private getSelectOptions(): Observable<ResourceListModel> {
        if (this.to.resource) {
            return this.dataStore.resource(this.to.resource.resource).listData$.pipe(takeUntil(this.destroyed$));
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
            return of({items: options, meta: [], schema: [], label: ""});
        } else {
            // return observable directly
            //return this.to.options ;
        }
    }
}
