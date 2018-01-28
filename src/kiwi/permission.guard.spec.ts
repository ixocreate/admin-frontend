import {TestBed} from '@angular/core/testing';

import {PermissionGuard} from './permission.guard';
import {ConfigurationService, LoggerService, UserService} from './services';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PermissionGuard', () => {
    let service: PermissionGuard;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                PermissionGuard,
                ConfigurationService,
                {provide: 'Config', useValue: 'test'},
                LoggerService,
                UserService,
            ]
        });
        service = TestBed.get(PermissionGuard);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created',
        () => {
            expect(service).toBeTruthy();
        }
    );
});
