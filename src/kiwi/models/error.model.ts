export class AdminError extends Error {
    readonly name = 'AdminError';
    protected _code = 'kiwi';

    constructor(message?: string) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AdminError.prototype);
    }

    code() {
        return this._code;
    }
}

export class BootstrapError extends AdminError {
    protected _code = 'kiwi.bootstrap';
}
