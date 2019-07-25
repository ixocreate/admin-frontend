import { OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';

export class CustomFieldTypeAbstract extends FieldType implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  value: any;

  ngOnInit() {
    (this.formControl as any).component = this;
    this.setValue(this.formControl.value);

    /**
     * make sure to listen to changes and apply the value locally as well
     * in case the data model is changed from the outside
     */
    this.formControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setValue(value: any) {
    this.value = value;
    this.formControl.setValue(value);
  }

  remove() {
    this.formControl.markAsTouched();
    this.setValue(null);
  }

  onSelect(value: any) {
    this.setValue(value);
  }
}
