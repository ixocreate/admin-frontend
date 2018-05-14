import {ErrorHandler, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AdminError} from '../models';
import {LoggerService} from './logger.service';

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
