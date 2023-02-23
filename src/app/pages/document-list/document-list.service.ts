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
export class DocumentListService {

    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL

    //Routes
    urlFilter: any = this.base_url + 'filter-1-sp-document';
    urlFilterSender: any = this.base_url + 'sender-date-sp-document';
    urlFilterReceiver: any = this.base_url + 'receiver-date-sp-document';
    urlLastRecSen: any = this.base_url + 'sender-receiver-spdoc';

    //Credentials
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Hasura-Client-Name', 'hasura-console')
        .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

    //Get Filter & Search
    getFilterSearch(
        shipping_no: any,
        sender_personal_number: any,
        sender_personal_name: any,
        sender_unit: any,
        receiver_personal_number: any,
        receiver_personal_name: any,
        receiver_unit: any,
        description: any,
        status: any,
        limit: any,
        page: any,
        shipping_no_order: any,
        sender_personal_number_order: any,
        sender_personal_name_order: any,
        sender_date_order: any,
        receiver_personal_number_order: any,
        receiver_personal_name_order: any,
        receiver_date_order: any,
        receiver_unit_order: any,
        sender_unit_order:any
    ): Observable<any> {
        const params = new HttpParams()
            .set('shipping_no', shipping_no)
            .set('sender_personal_number', sender_personal_number)
            .set('sender_personal_name', sender_personal_name)
            .set('sender_unit', sender_unit)
            .set('receiver_personal_number', receiver_personal_number)
            .set('receiver_personal_name', receiver_personal_name)
            .set('receiver_unit', receiver_unit)
            .set('description', description)
            .set('status', status)
            .set('limit', limit)
            .set('offset', page)
            .set('shipping_no_order', shipping_no_order)
            .set('sender_personal_number_order', sender_personal_number_order)
            .set('sender_personal_name_order', sender_personal_name_order)
            .set('sender_date_order', sender_date_order)
            .set('receiver_personal_number_order', receiver_personal_number_order)
            .set('receiver_personal_name_order', receiver_personal_name_order)
            .set('receiver_date_order', receiver_date_order)
            .set('receiver_unit_order', receiver_unit_order)
            .set('sender_unit_order', sender_unit_order)

        return this.http.get<any>(this.urlFilter, { 'params': params, 'headers': this.headers })
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

    //Get Filter By Date Sender
    getFilterSenderDate(
        shipping_no: any,
        sender_personal_number: any,
        sender_personal_name: any,
        sender_unit: any,
        receiver_personal_number: any,
        receiver_personal_name: any,
        receiver_unit: any,
        description: any,
        status: any,
        limit: any,
        page: any,
        sender_date: any,
        shipping_no_order: any,
        sender_personal_number_order: any,
        sender_personal_name_order: any,
        sender_date_order: any,
        receiver_personal_number_order: any,
        receiver_personal_name_order: any,
        receiver_date_order: any,
        receiver_unit_order: any,
        sender_unit_order:any
    ): Observable<any> {
        const params = new HttpParams()
            .set('shipping_no', shipping_no)
            .set('sender_personal_number', sender_personal_number)
            .set('sender_personal_name', sender_personal_name)
            .set('sender_unit', sender_unit)
            .set('receiver_personal_number', receiver_personal_number)
            .set('receiver_personal_name', receiver_personal_name)
            .set('receiver_unit', receiver_unit)
            .set('description', description)
            .set('status', status)
            .set('limit', limit)
            .set('offset', page)
            .set('sender_date', sender_date)
            .set('shipping_no_order', shipping_no_order)
            .set('sender_personal_number_order', sender_personal_number_order)
            .set('sender_personal_name_order', sender_personal_name_order)
            .set('sender_date_order', sender_date_order)
            .set('receiver_personal_number_order', receiver_personal_number_order)
            .set('receiver_personal_name_order', receiver_personal_name_order)
            .set('receiver_date_order', receiver_date_order)
            .set('receiver_unit_order', receiver_unit_order)
            .set('sender_unit_order', sender_unit_order)

        return this.http.get<any>(this.urlFilterSender, { 'params': params, 'headers': this.headers })
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

    //Get Filter By Date Receiver
    getFilterReceiverDate(
        shipping_no: any,
        sender_personal_number: any,
        sender_personal_name: any,
        sender_unit: any,
        receiver_personal_number: any,
        receiver_personal_name: any,
        receiver_unit: any,
        description: any,
        status: any,
        limit: any,
        page: any,
        receiver_date: any,
        shipping_no_order: any,
        sender_personal_number_order: any,
        sender_personal_name_order: any,
        sender_date_order: any,
        receiver_personal_number_order: any,
        receiver_personal_name_order: any,
        receiver_date_order: any,
        receiver_unit_order: any,
        sender_unit_order:any
    ): Observable<any> {
        const params = new HttpParams()
            .set('shipping_no', shipping_no)
            .set('sender_personal_number', sender_personal_number)
            .set('sender_personal_name', sender_personal_name)
            .set('sender_unit', sender_unit)
            .set('receiver_personal_number', receiver_personal_number)
            .set('receiver_personal_name', receiver_personal_name)
            .set('receiver_unit', receiver_unit)
            .set('description', description)
            .set('status', status)
            .set('limit', limit)
            .set('offset', page)
            .set('receiver_date', receiver_date)
            .set('shipping_no_order', shipping_no_order)
            .set('sender_personal_number_order', sender_personal_number_order)
            .set('sender_personal_name_order', sender_personal_name_order)
            .set('sender_date_order', sender_date_order)
            .set('receiver_personal_number_order', receiver_personal_number_order)
            .set('receiver_personal_name_order', receiver_personal_name_order)
            .set('receiver_date_order', receiver_date_order)
            .set('receiver_unit_order', receiver_unit_order)
            .set('sender_unit_order', sender_unit_order)

        return this.http.get<any>(this.urlFilterReceiver, { 'params': params, 'headers': this.headers })
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

    //Get Filter By Date Receiver and Sender
    getFilterReceiverSenderDate(
        shipping_no: any,
        sender_personal_number: any,
        sender_personal_name: any,
        sender_unit: any,
        receiver_personal_number: any,
        receiver_personal_name: any,
        receiver_unit: any,
        description: any,
        status: any,
        limit: any,
        page: any,
        receiver_date: any,
        sender_date: any,
        shipping_no_order: any,
        sender_personal_number_order: any,
        sender_personal_name_order: any,
        sender_date_order: any,
        receiver_personal_number_order: any,
        receiver_personal_name_order: any,
        receiver_date_order: any,
        receiver_unit_order: any,
        sender_unit_order:any
    ): Observable<any> {
        const params = new HttpParams()
            .set('shipping_no', shipping_no)
            .set('sender_personal_number', sender_personal_number)
            .set('sender_personal_name', sender_personal_name)
            .set('sender_unit', sender_unit)
            .set('receiver_personal_number', receiver_personal_number)
            .set('receiver_personal_name', receiver_personal_name)
            .set('receiver_unit', receiver_unit)

            .set('receiver_date', receiver_date)
            .set('sender_date', sender_date)

            .set('description', description)
            .set('status', status)
            .set('limit', limit)
            .set('offset', page)

            .set('shipping_no_order', shipping_no_order)
            .set('sender_personal_number_order', sender_personal_number_order)
            .set('sender_personal_name_order', sender_personal_name_order)
            .set('sender_date_order', sender_date_order)
            .set('receiver_personal_number_order', receiver_personal_number_order)
            .set('receiver_personal_name_order', receiver_personal_name_order)
            .set('receiver_date_order', receiver_date_order)
            .set('receiver_unit_order', receiver_unit_order)
            .set('sender_unit_order', sender_unit_order)

        return this.http.get<any>(this.urlLastRecSen, { 'params': params, 'headers': this.headers })
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