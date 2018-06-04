import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Link} from '../../../models';
import {ConfigurationService, MediaService} from '../../../services';

@Component({
    selector: 'link-modal',
    templateUrl: './link-modal.component.html',
})
export class LinkModalComponent implements OnInit, OnDestroy {
    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    @Output() onSelect = new EventEmitter<Link>();

    allowedTypes: Array<string>;
    selectedType = 'page';

    select(link: Link) {
        this.onSelect.emit(link);
    }

    constructor(protected dataService: MediaService,
                protected config: ConfigurationService) {
        //this.dataService.load();
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    get models$() {
        return this.dataService.models$;
    }

    get destroyed$() {
        return this._destroyed$.asObservable();
    }

    changeType(type: string) {
        this.selectedType = type;
    }

    onPageSelect(event) {
        this.onSelect.emit({type: 'page', value: event});
    }

    onMediaSelect(event) {
        this.onSelect.emit({type: 'media', value: 123});
    }

    externalSave() {
        this.onSelect.emit({type: 'external', value: 123});
    }
}
