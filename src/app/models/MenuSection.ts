import {Restaurant} from './Restaurant';
import {Dish} from './Dish';

export class MenuSection {
  constructor(
    public id: number = null,
    public name: string = '',
    public restaurant: Restaurant = null,
    public dishes: Dish [] = []
  ) {

  }
}
