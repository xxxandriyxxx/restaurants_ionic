import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavigationEnd, Router} from '@angular/router';
import {DataService} from './services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    userLogged: boolean;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private dataService: DataService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.router.navigated = false;
                const userClass = localStorage.getItem('_userClass');
                if (userClass == null) {
                    this.userLogged = false;
                } else {
                    this.userLogged = true;
                }
            }
        });

        this.setUrl();

    }


    setUrl() {
        const url = localStorage.getItem('_urlRestApi');
        if (url == null) {
            localStorage.setItem('_urlRestApi', this.dataService.url);
        }
    }


}
