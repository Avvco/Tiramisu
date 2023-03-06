import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    picshow$: Observable<boolean> | undefined;
    constructor( private router: Router) { }
    ngOnInit() {
        this.login$ = of(true);
        this.picshow$ = of(true);
    }
    login() {
        this.router.navigate(['/user/login']);
        this.picshow$ = of(false);
    }
    register() {
        this.router.navigate(['/user/register']);
        this.picshow$ = of(false);
    }
    logout() {
        this.login$ = of(false);
    }
}