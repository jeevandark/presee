

export class Account {
    name: string;
    bankId: string;
    branchId: string;
    accountId: string;

    private _id: string;
    
    constructor() {
    }

    get id(): string {
        return this._id;
    }
}
