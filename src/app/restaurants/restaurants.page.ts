import {Component, OnInit} from '@angular/core';
import {MainService} from '../services/main.service';
import {Restaurant} from '../models/Restaurant';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.page.html',
    styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

    restaurants: Restaurant[] = [];
    pathToLogo = '';

    constructor(private mainService: MainService,
                private router: Router,
                private dataService: DataService) {
    }

    ngOnInit() {
        this.mainService.getAllRestaurants()
            .subscribe((restaurants) => {
                    this.restaurants = restaurants;
                },
                error => {
                    console.log(error);
                });

        this.setPathToLogo();
    }


    goToRestaurant(id, restName) {
        this.router.navigate(['/restaurants/' + id], {queryParams: {name: restName}});
    }

    setPathToLogo() {
        this.pathToLogo = localStorage.getItem('_urlRestApi') + '/logo';
        if (this.pathToLogo == null) {
            this.pathToLogo = this.dataService.url + '/logo';
        }
    }


}
