import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {Client} from '../models/Client';
import {Observable} from 'rxjs';
import {TransferMessage} from '../models/TransferMessage';
import {Owner} from '../models/Owner';
import {BasicData} from '../models/BasicData';
import {User} from '../models/User';
import {Restaurant} from '../models/Restaurant';
import {MenuSection} from '../models/MenuSection';
import {Dish} from '../models/Dish';
import {Order} from '../models/Order';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    url = localStorage.getItem('_urlRestApi');
    // url = this.dataService.url;

    constructor(
        private http: HttpClient,
        private dataService: DataService) {
    }


    saveClient(client: Client): Observable<TransferMessage> {
        return this.http.post<TransferMessage>(this.url + '/save/client', client);
    }

    saveOwner(owner: Owner): Observable<TransferMessage> {
        return this.http.post<TransferMessage>(this.url + '/save/owner', owner);
    }

    login(loginData: BasicData) {
        return this.http.post(this.url + '/login/try', loginData,
            {observe: 'response', responseType: 'text'});
    }

    getAllRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(this.url + '/restaurants/get');
    }

    getMenuSections(restaurantId: string): Observable<MenuSection[]> {
        return this.http.get<MenuSection[]>(this.url + '/restaurant/menu-sections/get/' + restaurantId);
    }

    placeOrder(order: Order, userId: string, restaurantId: string): Observable<TransferMessage> {
        return this.http.post<TransferMessage>(this.url + '/order/place/' + userId + '/' + restaurantId, order,
            {headers: this.dataService.getAuthHeader()});
    }

    getMyOrders(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(this.url + '/orders/get/my/' + userId,
            {headers: this.dataService.getAuthHeader()});
    }

    changeOrderStatus(order: Order): Observable<TransferMessage> {
        return this.http.post<TransferMessage>(this.url + '/order/change-status', order,
            {headers: this.dataService.getAuthHeader()});
    }


}
