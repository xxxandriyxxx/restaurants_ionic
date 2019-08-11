import {User} from './User';
import {Order} from './Order';

export class Client extends User {

  constructor(
    public id: number = null,
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public avatar: string = '',
    public orders: Order [] = []
  ) {
    super(id, username, password, email, avatar, orders); }

}
