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

export class MyDocumentService {
    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL
    urlDashboardPrivateNumber = this.base_url + 'dashboard-private-number';
    urlDashboardPrivateUnit = this.base_url + 'dashboard-private-unit';
    urlCountNumber = this.base_url + 'count-sp-private-number';

    //Credentials
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Hasura-Client-Name', 'hasura-console')
        .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

    getDataDocumentNumber(
        limit: any,
        offset: any,
        sender_personal_name: any,
        sender_personal_number: any,
        shipping_no: any,
        receiver_personal_name: any,
        receiver_personal_number: any,
        sender_unit: any,
        receiver_unit: any,
        status: any,
        created_at: 'asc' | 'desc' | '',
        status_order: 'asc' | 'desc' | '',
        shipping_no_order: 'asc' | 'desc' | '',
        sender_date_order: 'asc' | 'desc' | '',
        receiver_date_order: 'asc' | 'desc' | '',
        updated_at: 'asc' | 'desc' | '',
        sender_personal_number_p: any,
        receiver_personal_number_p: any,
        receiver_unit_p: any,
    ): Observable<any> {

        const params = new HttpParams()
            .set('limit', limit)
            .set('offset', offset)
            .set('sender_personal_name', sender_personal_name)
            .set('sender_personal_number', sender_personal_number)
            .set('shipping_no', shipping_no)
            .set('receiver_personal_name', receiver_personal_name)
            .set('receiver_personal_number', receiver_personal_number)
            .set('sender_unit', sender_unit)
            .set('receiver_unit', receiver_unit)
            .set('status', status)
            .set('created_at', created_at)
            .set('status_order', status_order)
            .set('shipping_no_order', shipping_no_order)
            .set('sender_date_order', sender_date_order)
            .set('receiver_date_order', receiver_date_order)
            .set('updated_at', updated_at)
            .set('sender_personal_number_p', sender_personal_number_p)
            .set('receiver_personal_number_p', receiver_personal_number_p)
            .set('receiver_unit_p', receiver_unit_p)

        return this.http.get<any>(this.urlDashboardPrivateNumber, { 'params': params, 'headers': this.headers })
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
    getCountCardNumber(
        cat_status: any,
        sender_personal_number_p: any,
        receiver_personal_number_p: any,
        receiver_unit_p: any,
        ): Observable<any> {
        const params = new HttpParams()
            .set('cat_status', cat_status)
            .set('sender_personal_number_p', sender_personal_number_p)
            .set('receiver_personal_number_p', receiver_personal_number_p)
            .set('receiver_unit_p', receiver_unit_p)


        return this.http.get<any>(this.urlCountNumber, { 'params': params, 'headers': this.headers })
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