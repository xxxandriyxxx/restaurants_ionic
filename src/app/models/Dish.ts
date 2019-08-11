import {Restaurant} from './Restaurant';
import {Order} from './Order';
import {MenuSection} from './MenuSection';

export class Dish {

  constructor(
    public id: number = null,
    public name: string = '',
    public description: string = '',
    public price: number = null,
    public restaurant: Restaurant = null,
    public menuSection: MenuSection = null,
    public orders: Order [] = []
  ) {

  }

}
