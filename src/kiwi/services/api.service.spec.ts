import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

/**
 * mock a concrete implementation to test the abstract service
 */
@Injectable()
class ConcreteApiService extends ApiService {
    constructor(protected http: HttpClient) {
        super(http);
    }
}

describe('ConcreteApiService', () => {
    let service: ConcreteApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ConcreteApiService
            ],
        });
        service = TestBed.get(ConcreteApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    // afterEach(() => {
    //     httpMock.verify();
    // });

    it('should be created',
        () => {
            expect(service).toBeTruthy();
        }
    );

    // it(`should send an expected login request`, async(inject([ApiService, HttpTestingController],
    //     (service: ApiService, backend: HttpTestingController) => {
    //         service.login('foo', 'bar').subscribe();
    //
    //         backend.expectOne((req: HttpRequest<any>) => {
    //             const body = new HttpParams({ fromString: req.body });
    //
    //             return req.url === 'auth/login'
    //                 && req.method === 'POST'
    //                 && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
    //                 && body.get('user') === 'foo'
    //                 && body.get('password') === 'bar';
    //         }, `POST to 'auth/login' with form-encoded user and password`);
    //     })));
});
