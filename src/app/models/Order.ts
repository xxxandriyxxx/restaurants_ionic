import {Restaurant} from './Restaurant';
import {Client} from './Client';
import {Dish} from './Dish';
import {User} from './User';
import {OrderStatus} from './OrderStatus';

export class Order {

  constructor(
    public id: number = null,
    public date: Date = null,
    public status: OrderStatus = null,
    public user: User = null,
    public username: string = '',
    public restaurant: Restaurant = null,
    public dishes: Dish [] = [],
    public amount: number [] = []
  ) {

  }

}
