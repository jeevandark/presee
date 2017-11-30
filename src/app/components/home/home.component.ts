import { Component, OnInit } from '@angular/core';

import { StoreService } from 'app/providers/store.service';
import { Account } from 'app/account';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    activeAccount: Account;

    constructor(private store: StoreService) {
    }

    ngOnInit() {
        this.activeAccount = this.store.activeAccount;
        if (this.activeAccount == null) {
            this.store.createAccount();
            this.activeAccount = this.store.activeAccount;
        }
    }
}
