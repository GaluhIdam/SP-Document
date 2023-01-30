import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { baseURL } from './baseURL';

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
  urlFilter: any =  this.base_url + 'filter-1-sp-document';
  urlFilterSender: any =  this.base_url + 'sender-date-sp-document';
  urlFilterReceiver: any =  this.base_url + 'receiver-date-sp-document';


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
  ) {
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
  ) {
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
  ) {
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
}