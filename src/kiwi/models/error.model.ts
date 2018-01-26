export class KiwiAdminError extends Error {
    name = 'KiwiAdminError';
    protected _code = 'kiwi';

    constructor(message?: string) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, KiwiAdminError.prototype);
    }

    code() {
        return this._code;
    }
}

export class BootstrapError extends KiwiAdminError {
    protected _code = 'kiwi.bootstrap';
}
