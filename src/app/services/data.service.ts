import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // URL of the API
    public url = 'http://localhost:8080';
    // public url = 'http://ec2-18-219-114-136.us-east-2.compute.amazonaws.com:8080';

    // this resource location is set by the resource handler in the WebConfig class in the API project
    public pathToResources = this.url + '/logo';


    public passLoginRegExp = new RegExp('^[a-zA-Z0-9]{3,20}$');
    public emailRegExp = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
    public priceRegExp = new RegExp('^\\d+(\\.\\d{1,2})?$');
    public siteRegExp = new RegExp('[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)');
    public phoneRegExp = new RegExp('^\\+\\d{2}\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$');


    constructor() {
    }


    getAuthHeader(): HttpHeaders {
        return new HttpHeaders({Authorization: localStorage.getItem('_token')});
    }

    setApiUrl(newUrl: string) {
        this.url = newUrl;
    }
}
