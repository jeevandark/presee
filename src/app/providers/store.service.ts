import { Injectable } from '@angular/core';

import { Account } from 'app/account';

@Injectable()
export class StoreService {
    private _activeAccountId: string;
    private _accountList: Array<any>;

    private static readonly keyAccounts: string = 'keyAccounts';
    private static readonly keyActiveAccountId: string = 'keyActiveAccountId';

    constructor() {
    }

    get activeAccount(): any {
        let retItem: any;
        let activeAccId: string = localStorage.getItem(StoreService.keyActiveAccountId);
        if (activeAccId == null) {
            // active account id not set in local storage - try to set by the list:
            if (!this.isAccountListEmptyOrNull) {
                activeAccId = this._accountList[0].id;
                retItem = this._accountList[0];
            }
        } else {
            // if list is empty, set to null again:
            if (this.isAccountListEmptyOrNull) {
                activeAccId = null;
            } else {
                // try to find the account marked as active in the list:
                let idxInList: number = this._accountList.findIndex((myItem: any) => {
                    return myItem.id === activeAccId;
                });
                if (idxInList >= 0) {
                    retItem = this._accountList[idxInList];
                }
            }
        }
        if (activeAccId != null) {
            localStorage.setItem(StoreService.keyActiveAccountId, activeAccId);
        } else {
            localStorage.removeItem(StoreService.keyActiveAccountId);
        }
        return retItem;
    }

    get accountList(): Array<any> {
        if (this._accountList == null) {
            this.loadAccounts();
        }
        return this._accountList;
    }

    get isAccountListEmptyOrNull(): boolean {
        return this._accountList == null || this._accountList.length === 0;
    }

    createAccount(): Account {
        let newAcc: Account;
        let accIsOk: boolean = false;
        while (!accIsOk) {
            newAcc = new Account();
            // make sure that there is no other account in the list with the same uuid:
            let idxCheck: number = this.accountList.findIndex((chkAcc: Account) => {
                return chkAcc.id === newAcc.id;
            });
            accIsOk = idxCheck < 0;
            if (accIsOk) {
                this.accountList.push(newAcc);
                this.saveAccounts();
            }
        }
        return newAcc;
    }

    private loadAccounts(): void {
        let tmpAccountsStr: string = localStorage.getItem(StoreService.keyAccounts);
        if (tmpAccountsStr == null) {
            this._accountList = [];
        } else {
            this._accountList = JSON.parse(tmpAccountsStr);
        }
    }

    private saveAccounts(): void {
        if (this._accountList != null) {
            localStorage.setItem(StoreService.keyAccounts, JSON.stringify(this._accountList));
        }
    }

}
