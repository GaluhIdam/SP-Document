import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class LayoutService {

    constructor(private http: HttpClient) { }

    getUserData(personal_number: any): Observable<any> {
        const params = new HttpParams()
            .set('personal_number', personal_number);
        return this.http.get('https://api.gmf-aeroasia.co.id/th/soe/v1/employee/' + personal_number)
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