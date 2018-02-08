import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {AdminError} from '../models';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    _errors = [];

    private _errors$: BehaviorSubject<AdminError[]>;

    private reportErrors = [
        AdminError,
    ];

    constructor(private logger: LoggerService) {
        super();
        this._errors$ = new BehaviorSubject(<AdminError[]>[]);
    }

    get errors$() {
        return this._errors$.asObservable();
    }

    handleError(error) {
        if (error instanceof AdminError) {
            this._errors.push(error);
            this._errors$.next(this._errors);
        }

        this.logger.logError(error);
    }
}
