import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BasicData} from '../models/BasicData';
import {DataService} from '../services/data.service';
import {MainService} from '../services/main.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    logForm = {
        loginEmail: '',
        password: ''
    };
    basicData: BasicData = new BasicData();

    constructor(private mainService: MainService,
                private dataService: DataService,
                private router: Router,
                public alertController: AlertController) {
    }

    ngOnInit() {
    }

    login() {
        if (this.dataService.emailRegExp.test(this.logForm.loginEmail)) {
            this.basicData.email = this.logForm.loginEmail;
            this.basicData.username = '';
        } else {
            this.basicData.username = this.logForm.loginEmail;
            this.basicData.email = '';
        }
        this.basicData.password = this.logForm.password;

        this.mainService.login(this.basicData)
            .subscribe((value) => {
                    const token = value.headers.get('Authorization');
                    const userClass = value.headers.get('UserClass');
                    const userId = value.headers.get('UserId');
                    const loginStatusCode = Number(value.headers.get('LoginStatusCode')); // +'string'

                    if (loginStatusCode >= 200 && loginStatusCode < 400) {
                        localStorage.setItem('_token', token);
                        localStorage.setItem('_userClass', userClass);
                        localStorage.setItem('_userId', userId);
                        this.presentAlert('You have been successfully signed in !');
                        this.router.navigate(['/restaurants']);
                    } else {
                        this.presentAlert(value.body.toString() + '. Please, check your data!');
                        this.router.navigate(['/sign-in']);
                    }
                },
                error => {
                    this.presentAlert(error);
                });

    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            header: 'Sign in',
            message: message.toString(),
            buttons: ['OK']
        });
        await alert.present();
    }


}
