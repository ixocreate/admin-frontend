import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {AdminError} from '../models';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    _errors = [];

    errors$: BehaviorSubject<AdminError[]>;

    private reportErrors = [
        AdminError,
    ];

    constructor(private logger: LoggerService) {
        super();
        this.errors$ = new BehaviorSubject(<AdminError[]>[]);
    }

    handleError(error) {
        if (error instanceof AdminError) {
            this._errors.push(error);
            this.errors$.next(this._errors);
        }

        this.logger.logError(error);
    }
}
