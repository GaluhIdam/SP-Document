import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from 'src/app/core/services/baseURL';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DashboardService {
    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL
    //Routes
    urlDashboard: any = this.base_url + 'sort-sp-document';
    urlCount: any = this.base_url + 'count-sp-document';
    urlSearchFilter: any = this.base_url + 'search-filter-sp-document'

    //Credentials
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Hasura-Client-Name', 'hasura-console')
        .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

    //Test
    getDataDocument(
        limit: any,
        offset: any,
        sender_personal_name: any,
        sender_personal_number: any,
        shipping_no: any,
        receiver_personal_name: any,
        receiver_personal_number: any,
        status: any,
        created_at: 'asc' | 'desc' | '',
        status_order: 'asc' | 'desc' | '',
        shipping_no_order: 'asc' | 'desc' | '',
        sender_date_order: 'asc' | 'desc' | '',
        receiver_date_order: 'asc' | 'desc' | '',
    ): Observable<any> {

        const params = new HttpParams()
            .set('limit', limit)
            .set('offset', offset)
            .set('sender_personal_name', sender_personal_name)
            .set('sender_personal_number', sender_personal_number)
            .set('shipping_no', shipping_no)
            .set('receiver_personal_name', receiver_personal_name)
            .set('receiver_personal_number', receiver_personal_number)
            .set('status', status)
            .set('created_at', created_at)
            .set('status_order', status_order)
            .set('shipping_no_order', shipping_no_order)
            .set('sender_date_order', sender_date_order)
            .set('receiver_date_order', receiver_date_order);

        return this.http.get<any>(this.urlSearchFilter, { 'params': params, 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    console.log(error);
                    throw error;
                })
            )
    }

    //Get All Data & By Status [Open, Delivered]
    getDashboard(
        status: any,
        limit: number,
        offset: number,
        shipping_no: any,
        created_at: any,
        sender_date: any,
        receiver_date: any,
        status_order: any,
    ): Observable<any> {

        const params = new HttpParams()
            .set('status', status)
            .set('limit', limit)
            .set('offset', offset)
            .set('shipping_no', shipping_no)
            .set('created_at', created_at)
            .set('sender_date', sender_date)
            .set('receiver_date', receiver_date)
            .set('status_order', status_order)

        return this.http.get<any>(this.urlDashboard, { 'params': params, 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    console.log(error);
                    throw error;
                })
            )
    }

    //Get Result Count Data
    getCountCard(cat_status: any): Observable<any> {
        const params = new HttpParams()
            .set('cat_status', cat_status);

        return this.http.get<any>(this.urlCount, { 'params': params, 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    console.log(error);
                    throw error;
                })
            )
    }
}