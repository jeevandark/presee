import { Component, OnInit } from '@angular/core';

import { StoreService } from 'app/providers/store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    activeAccount: any;

    title = `App works !`;

    constructor(private store: StoreService) { 
    }

    ngOnInit() {

    }
}
