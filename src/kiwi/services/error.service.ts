import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {KiwiAdminError} from '../models';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    _errors = [];

    errors$: BehaviorSubject<KiwiAdminError[]>;

    private reportErrors = [
        KiwiAdminError,
    ];

    constructor(private logger: LoggerService) {
        super();
        this.errors$ = new BehaviorSubject(<KiwiAdminError[]>[]);
    }

    handleError(error) {
        if (error instanceof KiwiAdminError) {
            this._errors.push(error);
            this.errors$.next(this._errors);
        }

        this.logger.logError(error);
    }
}
