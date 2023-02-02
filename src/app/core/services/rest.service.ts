import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from './baseURL';
import { CreateDocument } from '../interfaces/create-sp-document.dto';

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
  urlFilter: any = this.base_url + 'filter-1-sp-document';
  urlFilterSender: any = this.base_url + 'sender-date-sp-document';
  urlFilterReceiver: any = this.base_url + 'receiver-date-sp-document';
  urlCreateDocument: any = this.base_url + 'create-sp-document';
  urlLastDocument: any = this.base_url + 'last-sp-document';
  urlLastRecSen: any = this.base_url + 'sender-receiver-spdoc';
  urlShowDocument: any = this.base_url + 'show-sp-document';


  //Credentials
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Hasura-Client-Name', 'hasura-console')
    .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

  //Get All Data & By Status [Open, Delivered]
  getDashboard(status: any): Observable<any> {

    const params = new HttpParams()
      .set('status', status);

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

  getLastID(): Observable<any> {
    return this.http.get<any>(this.urlLastDocument, { 'headers': this.headers })
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

  //Get Filter & Search
  getFilterSearch(
    shipping_no: any,
    sender_personal_number: any,
    sender_personal_name: any,
    receiver_personal_number: any,
    receiver_personal_name: any,
    status: any,
    limit: any,
    page: any,
  ): Observable<any> {
    const params = new HttpParams()
      .set('shipping_no', shipping_no)
      .set('sender_personal_number', sender_personal_number)
      .set('sender_personal_name', sender_personal_name)
      .set('receiver_personal_number', receiver_personal_number)
      .set('receiver_personal_name', receiver_personal_name)
      .set('status', status)
      .set('limit', limit)
      .set('offset', page);

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
    receiver_personal_number: any,
    receiver_personal_name: any,
    status: any,
    limit: any,
    page: any,
    sender_date: any
  ): Observable<any> {
    const params = new HttpParams()
      .set('shipping_no', shipping_no)
      .set('sender_personal_number', sender_personal_number)
      .set('sender_personal_name', sender_personal_name)
      .set('receiver_personal_number', receiver_personal_number)
      .set('receiver_personal_name', receiver_personal_name)
      .set('sender_date', sender_date)
      .set('status', status)
      .set('limit', limit)
      .set('offset', page);

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
    receiver_personal_number: any,
    receiver_personal_name: any,
    status: any,
    limit: any,
    page: any,
    receiver_date: any
  ): Observable<any> {
    const params = new HttpParams()
      .set('shipping_no', shipping_no)
      .set('sender_personal_number', sender_personal_number)
      .set('sender_personal_name', sender_personal_name)
      .set('receiver_personal_number', receiver_personal_number)
      .set('receiver_personal_name', receiver_personal_name)
      .set('receiver_date', receiver_date)
      .set('status', status)
      .set('limit', limit)
      .set('offset', page);

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
    receiver_personal_number: any,
    receiver_personal_name: any,
    status: any,
    limit: any,
    page: any,
    receiver_date: any,
    sender_date: any,
  ): Observable<any> {
    const params = new HttpParams()
      .set('shipping_no', shipping_no)
      .set('sender_personal_number', sender_personal_number)
      .set('sender_personal_name', sender_personal_name)
      .set('receiver_personal_number', receiver_personal_number)
      .set('receiver_personal_name', receiver_personal_name)

      .set('receiver_date', receiver_date)
      .set('sender_date', sender_date)

      .set('status', status)
      .set('limit', limit)
      .set('offset', page);

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

  //Create Document
  createDocument(
    sender_personal_number: Number,
    sender_personal_name: String,
    sender_date: Date,
    sender_unit: String,
    receiver_unit: String,
    created_by: String,
    status: String,
    shipping_no: number,
    data: Array<CreateDocument>,
  ): Observable<any> {

    const body = {
      "sender_personal_number": sender_personal_number,
      "sender_personal_name": sender_personal_name,
      "sender_date": sender_date,
      "sender_unit": sender_unit,
      "receiver_unit": receiver_unit,
      "created_by": created_by,
      "status": status,
      "shipping_no": shipping_no.toString(),
      "data": data
    }

    return this.http.post<any>(this.urlCreateDocument, body, { 'headers': this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw error
        })
      )
  }

  //Get Show Document by ID
  getShowData(id_sp_data: any): Observable<any> {

    const params = new HttpParams()
      .set('id_sp_data', id_sp_data);

    return this.http.get<any>(this.urlShowDocument, { 'params': params, 'headers': this.headers })
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