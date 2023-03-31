import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class HeaderService {

    constructor(private http: HttpClient) { }

    getUserData(personal_number: any): Observable<any> {
        const params = new HttpParams()
            .set('personal_number', personal_number);
        return this.http.get('http://172.16.41.125:8321/v3/api/user/soe/info', { 'params': params })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    console.log(error)
                    throw error
                })
            )
    }
}