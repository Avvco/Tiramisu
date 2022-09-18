import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
//import 'rxjs/add/observable/of';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    login$: Observable<boolean> | undefined;//may have problem (? or !)
    constructor() { }
    ngOnInit() {
        this.login$ = of(true);
    }
    logout() {
        this.login$ = of(false);
    }
}