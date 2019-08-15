import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // URL of the API
    // public url = 'http://localhost:8080';
    public url = 'http://ec2-52-15-125-215.us-east-2.compute.amazonaws.com:8080';

    public passLoginRegExp = new RegExp('^[a-zA-Z0-9]{3,20}$');
    public emailRegExp = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');


    constructor() {
    }


    getAuthHeader(): HttpHeaders {
        return new HttpHeaders({Authorization: localStorage.getItem('_token')});
    }


}
