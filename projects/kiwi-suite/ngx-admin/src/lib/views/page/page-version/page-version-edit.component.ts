import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {map, takeUntil} from 'rxjs/operators';
import {ResourceEditComponent} from "../../resource/resource-edit.component";

@Component({
    selector: 'page-version-edit',
    templateUrl: './page-version-edit.component.html',
})
export class PageVersionEditComponent extends ResourceEditComponent
{
    protected type = "page-version";
    @Input('id') protected id: string;

    ngOnInit() {
        this.initDataService(this.type);
        this.initModel();
    }

    protected initModel() {
        this.loadUpdateData();
        this.dataService.updateData$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(data => {
                if (!data) {
                    return;
                }
                this.originalData = data;
                this.resetForm();
            });
    }
    
    loadUpdateData()
    {
        this.dataService.loadUpdateData(this.id, {}, () => {
            return this.config.params.routes['pageVersionDetail'].replace("{id}", this.id);
        });
    }

    onSubmit(): void {

    }

    get versionForm() {
        return this.form;
    }

}
