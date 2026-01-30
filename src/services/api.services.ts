import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constant } from '../constants/app.constant'

@Injectable({
    providedIn: 'root'
})

export class APIServices {

    constructor(private http: HttpClient) { }

    //Create new account API
    createNewAccount(payload: any): Observable<any> {
        const url = constant.API_ENDPOINT + constant.REGISTER;
        return this.http.post(url, payload);
    }

}