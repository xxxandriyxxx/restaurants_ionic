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
        localStorage.removeItem('_token');
        localStorage.removeItem('_userClass');
        localStorage.removeItem('_userId');
        this.router.navigate(['/']);
    }

}
