import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {MainService} from '../services/main.service';
import {MenuSection} from '../models/MenuSection';
import {Dish} from '../models/Dish';
import {Order} from '../models/Order';
import {ActivatedRoute} from '@angular/router';
import {OrderStatus} from '../models/OrderStatus';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-single-restaurant',
    templateUrl: './single-restaurant.page.html',
    styleUrls: ['./single-restaurant.page.scss'],
})
export class SingleRestaurantPage implements OnInit {

    showMakeOrder = false;
    showBuy = false;
    totalAmount = 0;
    totalCost = 0;
    restaurantId = '';
    menuSections: MenuSection[] = [];
    ordDishes: Dish[] = [];
    newOrder: Order = new Order();
    private restaurantName = '';
    showSect: boolean [] = [];


    constructor(private mainService: MainService,
                private dataService: DataService,
                private activatedRoute: ActivatedRoute,
                public alertController: AlertController) {
    }

    ngOnInit() {
        this.loadData();
        this.updateData();
    }


    loadData() {
        this.activatedRoute.params.subscribe((params) => {
            this.restaurantId = params.id;
        });

        this.activatedRoute.queryParams.subscribe((params) => {
            this.restaurantName = params.name;
        });

        this.mainService.getMenuSections(this.restaurantId)
            .subscribe((sections) => {
                    this.menuSections = sections;
                    this.ordDishes = [];
                    for (const s of sections) {
                        for (const d of s.dishes) {
                            // d.amount = 1;
                            this.ordDishes.push(d);
                        }
                    }
                },
                error => {
                    console.log(error);
                });

    }

    updateData() {
        const userClass = localStorage.getItem('_userClass');
        if (userClass == null || userClass === 'AdminInMemory') {
            this.showBuy = false;
        } else {
            this.showBuy = true;
        }
        for (const sect of this.menuSections) {
            this.showSect.push(false);
        }
    }


    addDishToOrder(id: number) {
        const item = this.ordDishes.find(i => i.id === id);
        const index = this.newOrder.dishes.findIndex(x => x.id === id);
        if (index === -1) {
            this.newOrder.dishes.push(item);
            this.newOrder.amount.push(1);
        } else {
            this.newOrder.amount[index] += 1;
        }
        this.totalAmount += 1;
        this.totalCost += item.price;
    }


    showSection(id: number) {
        this.showSect[id] = true;
    }

    hideSection(id: number) {
        this.showSect[id] = false;

    }


    increaseAmount(index: number) {
        this.totalAmount += 1;
        this.totalCost += this.newOrder.dishes[index].price;
        this.newOrder.amount[index] += 1;
    }


    reduceAmount(index: number) {
        if (this.newOrder.amount[index] === 1) {
            this.deleteDish(index);
        } else {
            this.totalAmount -= 1;
            this.totalCost -= this.newOrder.dishes[index].price;
            this.newOrder.amount[index] -= 1;
        }
    }


    deleteDish(index: number) {
        this.totalCost -= this.newOrder.dishes[index].price * this.newOrder.amount[index];
        this.totalAmount -= this.newOrder.amount[index];
        this.newOrder.dishes.splice(index, 1);
        this.newOrder.amount.splice(index, 1);
    }


    cancel() {
        this.showMakeOrder = false;
        this.ngOnInit();
    }

    placeOrder() {
        this.newOrder.date = new Date();
        this.newOrder.status = OrderStatus.ORDERED;
        this.mainService.placeOrder(this.newOrder, localStorage.getItem('_userId'), this.restaurantId)
            .subscribe((val) => {
                    console.log(val);
                    this.newOrder = new Order();
                    this.totalAmount = 0;
                    this.totalCost = 0;
                    this.cancel();
                    this.presentAlert(val.message);
                },
                error => {
                    this.presentAlert(error.body.toString());
                });

    }


    async presentAlert(message) {
        const alert = await this.alertController.create({
            header: 'Response of the restaurant:',
            message: message.toString(),
            buttons: ['OK']
        });
        await alert.present();
    }
}
