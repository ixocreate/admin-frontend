import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from './configuration.service';
import {LoggerService} from './index';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserService,
                ConfigurationService,
                {provide: 'Config', useValue: 'test'},
                LoggerService,
            ]
        });
        service = TestBed.get(UserService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created',
        () => {
            expect(service).toBeTruthy();
        }
    );
});
