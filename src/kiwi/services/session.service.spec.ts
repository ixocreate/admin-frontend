import {TestBed} from '@angular/core/testing';

import {SessionService} from './session.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from './configuration.service';

describe('SessionService', () => {
    let service: SessionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                SessionService,
                ConfigurationService,
                {provide: 'Config', useValue: 'test'}
            ]
        });
        service = TestBed.get(SessionService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created',
        () => {
            expect(service).toBeTruthy();
        }
    );
});
