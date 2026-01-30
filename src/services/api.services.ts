import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constant } from '../constants/app.constant'

@Injectable({
    providedIn: 'root'
})

export class APIServices {

    constructor(private http: HttpClient) { }

    //Create new account API
    register(payload: any): Observable<any> {
        const url = constant.API_ENDPOINT + constant.REGISTER;
        return this.http.post(url, payload);
    }

    //Validate the User
    login(payload: any): Observable<any> {
        const url = constant.API_ENDPOINT + constant.LOGIN;
        return this.http.post(url, payload);
    }

    find_all(): Observable<any> {
        const url = constant.API_ENDPOINT + constant.FIND_ALL;
        return this.http.get(url);
    }

}