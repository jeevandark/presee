import { UUID } from 'angular2-uuid';

export class Account {
    name: string;
    bankId: string;
    branchId: string;
    accountId: string;

    private _id: string;

    constructor() {
        this._id = UUID.UUID();
    }

    get id(): string {
        return this._id;
    }
}
