import {Owner} from './Owner';
import {Dish} from './Dish';
import {Order} from './Order';
import {MenuSection} from './MenuSection';



export class Restaurant {
  constructor(
    public id: number = null,
    public name: string = '',
    public address: string = '',
    public phoneNumber: string = '',
    public site: string = '',
    public about: string = '',
    public logo: string = '',
    public owner: Owner = null,
    public menuSections: MenuSection [] = [],
    public dishes: Dish [] = [],
    public orders: Order [] = []
  ) {

  }
}
