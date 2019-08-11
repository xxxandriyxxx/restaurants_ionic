import {Component, OnInit} from '@angular/core';
import {Client} from '../models/Client';
import {Owner} from '../models/Owner';
import {MainService} from '../services/main.service';
import {DataService} from '../services/data.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

    regForm = {
        username: '',
        password: '',
        email: ''
    };
    client: Client = new Client();
    owner: Owner = new Owner();


    constructor(private mainService: MainService,
                private dataService: DataService,
                private router: Router,
                public alertController: AlertController) {
    }

    ngOnInit() {

    }

    saveUser(isClient: boolean, isOwner: boolean) {
        if (isClient) {
            this.client.username = this.regForm.username;
            this.client.password = this.regForm.password;
            this.client.email = this.regForm.email;
            this.mainService.saveClient(this.client)
                .subscribe((value) => {
                        this.presentAlert(value.message);
                    },
                    error => {
                        this.presentAlert(error.body.toString() + '. Please, check your data!');
                    });
        } else if (isOwner) {
            this.owner.username = this.regForm.username;
            this.owner.password = this.regForm.password;
            this.owner.email = this.regForm.email;
            this.mainService.saveOwner(this.owner)
                .subscribe((value) => {
                        this.presentAlert(value.message);
                    },
                    error => {
                        this.presentAlert(error.body.toString() + '. Please, check your data!');
                    });
        } else {
            console.log('ERROR of saveUser function');
        }
        this.router.navigate(['/restaurants']);
    }


    async presentAlert(message) {
        const alert = await this.alertController.create({
            header: 'Sign up',
            message: message.toString(),
            buttons: ['OK']
        });
        await alert.present();
    }

}
