import {AsyncSubject} from 'rxjs';
import {ApiService} from './api.service';

export abstract class DataService {

    /**
     * ready will only be posted as soon as it's set and completed (AsyncSubject)
     * @type {AsyncSubject<boolean>}
     * @private
     */
    private _ready$ = new AsyncSubject<boolean>();

    constructor(protected api: ApiService) {
    }

    get loading$() {
        return this.api.loading$;
    }

    get ready$() {
        return this._ready$.asObservable();
    }

    /**
     * update ready AsyncSubject
     */
    protected ready() {
        this._ready$.next(true);
        this._ready$.complete();
    }

    /**
     * for debugging purposes
     * @param {boolean} ready
     */
    nextReady(ready: boolean) {
        this._ready$.next(ready);
    }
}
