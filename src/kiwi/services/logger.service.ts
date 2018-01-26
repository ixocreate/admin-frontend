import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {KiwiAdminError} from '../models';

@Injectable()
export class LoggerService {

    constructor() {
    }

    logError(error: any) {
        const date = new Date().toISOString();
        if (error instanceof HttpErrorResponse) {
            console.error(date, 'HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
        } else if (error instanceof KiwiAdminError) {
            console.warn('[' + error.name + ']', error.code());
            // } else if (error instanceof TypeError) {
            // todo: log to api
            //     console.error(date, 'Type error.', error.message);
            // } else if (error instanceof Error) {
            // todo: log to api
            //     console.error(date, 'General error.', error.message);
        } else {
            // console.error(date, error);
            console.error(error);
            // throw error;
        }
    }

    log(message, ...params: any[]) {
        if (params.length) {
            console.log('[kiwi]', message, params);
        } else {
            console.log('[kiwi]', message);
        }
    }
}
