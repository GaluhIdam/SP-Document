import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from 'src/app/core/services/baseURL';

@Injectable({
    providedIn: 'root'
})

export class SidebarService {
    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL
    urlReadNotif: any = this.base_url + 'read-notif/'

    //Credentials
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Hasura-Client-Name', 'hasura-console')
        .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

    readNotif(id_notif: any): Observable<any> {
        const body = {
            'id_notif': id_notif
        }
        return this.http.put<any>(this.urlReadNotif + id_notif, body, { 'headers': this.headers })
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