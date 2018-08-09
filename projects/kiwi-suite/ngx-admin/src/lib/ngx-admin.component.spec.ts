import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAdminComponent } from './ngx-admin.component';

describe('NgxAdminComponent', () => {
  let component: NgxAdminComponent;
  let fixture: ComponentFixture<NgxAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
