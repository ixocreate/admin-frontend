import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from './configuration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Config} from '../models';
import {LoggerService} from './index';

describe('ConfigurationService', () => {
    let service: ConfigurationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ConfigurationService,
                {provide: 'Config', useValue: 'test'},
                LoggerService,
            ]
        });
        service = TestBed.get(ConfigurationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created',
        () => {
            expect(service).toBeTruthy();
        }
    );
});
