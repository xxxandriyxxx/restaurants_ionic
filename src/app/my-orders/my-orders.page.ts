import {Component, OnInit} from '@angular/core';
import {Order} from '../models/Order';
import {OrderStatus} from '../models/OrderStatus';
import {MainService} from '../services/main.service';
import {Restaurant} from '../models/Restaurant';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.page.html',
    styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

    myOrders: Order [] = [];
    totalCost: number [] = [];
    restaurants: Restaurant [] = [];

    constructor(private mainService: MainService,
                public alertController: AlertController) {
    }


    ngOnInit() {
        this.loadData();
    }


    loadData() {
        this.myOrders = [];
        this.mainService.getMyOrders(localStorage.getItem('_userId'))
            .subscribe((val) => {
                    val.reverse();
                    this.myOrders = val;
                    this.updateData();
                },
                error => {
                    console.log(error);
                });
    }


    updateData() {
        this.totalCost = [];
        for (const ord of this.myOrders) {
            let ordCost = 0;
            for (const dish of ord.dishes) {
                ordCost += dish.price * ord.amount[ord.dishes.indexOf(dish)];
            }
            this.totalCost.push(ordCost);
        }
    }


    cancelOrder(ord: Order) {
        ord.status = OrderStatus.CANCELED_BY_CLIENT;
        this.mainService.changeOrderStatus(ord)
            .subscribe((value) => {
                    this.presentAlert(value.message);
                    this.loadData();
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
