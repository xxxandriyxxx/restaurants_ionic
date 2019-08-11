import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.page.html',
    styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/restaurants']);
    }

}
