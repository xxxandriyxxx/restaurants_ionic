import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-api',
    templateUrl: './api.page.html',
    styleUrls: ['./api.page.scss'],
})
export class APIPage implements OnInit {

    url = localStorage.getItem('_urlRestApi');
    newUrl = '';

    constructor(public alertController: AlertController) {
    }

    ngOnInit() {
    }

    setUrl() {
        // window.location.reload();
        this.presentAlertConfirm();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            // header: 'Result:',
            message: 'API URL has been changed',
            buttons: ['OK']
        });
        window.location.reload();
        await alert.present();

    }


    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'API URL will be changed. Continue?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'OK',
                    handler: () => {
                        localStorage.setItem('_urlRestApi', this.newUrl);
                        window.location.reload();
                    }
                }
            ]
        });

        await alert.present();
    }


}
