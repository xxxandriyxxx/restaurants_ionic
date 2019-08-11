import { Injectable } from '@angular/core';
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

  url = this.dataService.url;

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

  activation(jwt): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/activation', new TransferMessage(jwt));
  }

  login(loginData: BasicData) {
    return this.http.post(this.url + '/login/try', loginData,
        {observe: 'response', responseType: 'text'});
  }

  getUserById(id: string): Observable<User> {
    // const headersOption = new HttpHeaders({Authorization: localStorage.getItem('_token')});
    return this.http.get<User>(this.url + '/user/get/' + id,
        {headers: this.dataService.getAuthHeader()});
  }

  updateAccount(userId: string, basicData: BasicData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/user/update/' + userId, basicData,
        {headers: this.dataService.getAuthHeader()});
  }

  changeRestaurantData(restaurant: Restaurant): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/change', restaurant,
        {headers: this.dataService.getAuthHeader()});
  }

  addRestaurant(ownerId: string, formData: FormData): Observable<TransferMessage> {
    console.log(formData);
    return this.http.post<TransferMessage>(this.url + '/restaurant/add/' + ownerId, formData,
        {headers: this.dataService.getAuthHeader()});
  }

  changeLogo(restId: number, formData: FormData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/change/logo/' + restId, formData,
        {headers: this.dataService.getAuthHeader()});
  }

  getRestaurants(ownerId: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants/get/' + ownerId,
        {headers: this.dataService.getAuthHeader()});
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants/get');
  }

  deleteRestaurant(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/restaurant/delete/' + id,
        {headers: this.dataService.getAuthHeader()});
  }

  addMenuSection(restaurantId: string, newMenuSection: MenuSection): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/menu-section/add/' + restaurantId, newMenuSection,
        {headers: this.dataService.getAuthHeader()});
  }

  getMenuSections(restaurantId: string): Observable<MenuSection[]> {
    return this.http.get<MenuSection[]>(this.url + '/restaurant/menu-sections/get/' + restaurantId);
  }

  changeMenuSection(menuSection: MenuSection): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/menu-section/change', menuSection,
        {headers: this.dataService.getAuthHeader()});
  }

  deleteMenuSection(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/restaurant/menu-section/delete/' + id,
        {headers: this.dataService.getAuthHeader()});
  }

  addDish(restaurantId: string, sectionId: number, dish: Dish): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/dish/add/' + restaurantId + '/' + sectionId, dish,
        {headers: this.dataService.getAuthHeader()});
  }

  getDishesBySectionId(sectionId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/restaurant/dishes/get/{sectionId}' + sectionId,
        {headers: this.dataService.getAuthHeader()});
  }

  getDishesByRestaurantId(restaurantId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/restaurant/dishes/get/' + restaurantId,
        {headers: this.dataService.getAuthHeader()});
  }

  changeDish(dish: Dish): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/dish/change', dish,
        {headers: this.dataService.getAuthHeader()});
  }

  deleteDish(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/restaurant/dish/delete/' + id,
        {headers: this.dataService.getAuthHeader()});
  }

  placeOrder(order: Order, userId: string, restaurantId: string): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/order/place/' + userId + '/' + restaurantId, order,
        {headers: this.dataService.getAuthHeader()});
  }

  getMyOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/orders/get/my/' + userId,
        {headers: this.dataService.getAuthHeader()});
  }

  getOrdersByOwnerId(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/orders/get/clients/' + id,
        {headers: this.dataService.getAuthHeader()});
  }

  changeOrderStatus(order: Order): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/order/change-status', order,
        {headers: this.dataService.getAuthHeader()});
  }
}
