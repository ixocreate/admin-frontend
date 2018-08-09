import { TestBed, inject } from '@angular/core/testing';

import { NgxAdminService } from './ngx-admin.service';

describe('NgxAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxAdminService]
    });
  });

  it('should be created', inject([NgxAdminService], (service: NgxAdminService) => {
    expect(service).toBeTruthy();
  }));
});
