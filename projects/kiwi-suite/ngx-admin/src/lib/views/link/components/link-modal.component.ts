import {Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeUrl, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Link} from '../../../models';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ConfigurationService, MediaService} from "../../../services";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'link-modal',
  templateUrl: './link-modal.component.html',
})
export class LinkModalComponent implements OnInit, OnDestroy {
  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Output() onSelect = new EventEmitter<Link>();

  allowedTypes: Array<string>;
  selectedType: string = 'page';

  select(link: Link) {
    this.onSelect.emit(link);
  }

  constructor(protected dataService: MediaService,
              protected config: ConfigurationService,
              protected domSanitizer: DomSanitizer) {

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