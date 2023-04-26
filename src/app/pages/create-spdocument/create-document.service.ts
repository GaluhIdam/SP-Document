import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateDocument } from 'src/app/core/interfaces/create-sp-document.dto';
import { baseURL } from 'src/app/core/services/baseURL';

@Injectable({
  providedIn: 'root',
})
export class CreateDocumentService {
  constructor(private http: HttpClient) { }

  //Base URL
  base_url: String = baseURL.BASE_URL;
  //Routes
  urlLastDocument: any = this.base_url + 'last-sp-document';
  urlCreateDocument: any = this.base_url + 'create-sp-document';
  urlNotif: any = this.base_url + 'insert-notif';
  urlUpdateNotif: any = this.base_url + 'update-notif/';
  urlCheckNotif: any = this.base_url + 'check-notif/';

  // urlPushNotif: any = 'http://172.16.41.107:8322/v1/api/notification';
  urlPushNotif: any = 'https://utils.gmf-aeroasia.co.id/v1/api/notification';

  //Credentials
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Hasura-Client-Name', 'hasura-console')
    .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi')
    .set('Access-Control-Allow-Origin', '*');

  getLastID(): Observable<any> {
    return this.http
      .get<any>(this.urlLastDocument, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
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
    file_name?: string
  ): Observable<any> {
    const body = {
      sender_personal_number: sender_personal_number,
      sender_personal_name: sender_personal_name,
      sender_date: sender_date,
      sender_unit: sender_unit,
      receiver_unit: receiver_unit,
      created_by: created_by,
      status: status,
      shipping_no: shipping_no.toString(),
      data: data,
      file_location: file_name,
    };

    return this.http
      .post<any>(this.urlCreateDocument, body, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('projectName', 'spdoc');
    formData.append('publicStatus', 'public');
    formData.append('projectUser', '80000');

    const response = this.http.post(baseURL.FILE_SERVER, formData);

    return response;
  }

  //Insert Notif
  insertNotif(
    id_spdoc: any,
    status: any,
    title: any,
    unit: any
  ): Observable<any> {
    const body = {
      id_spdoc: id_spdoc,
      status: status,
      title: title,
      unit: unit,
    };
    return this.http
      .post<any>(this.urlNotif, body, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  //Notification
  pushNotif(unit: any, status: any): Observable<any> {
    const params = new HttpParams().set('channel', 'spdoc');
    const body = {
      unit: unit,
      status: status,
    };
    return this.http
      .post<any>(this.urlPushNotif, body, { params: params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  updateNotif(
    id_spdoc: any,
    status: any,
    title: any,
    unit: any
  ): Observable<any> {
    const body = {
      id_spdoc: id_spdoc,
      status: status,
      title: title,
      unit: unit,
    };

    return this.http
      .put<any>(this.urlUpdateNotif + id_spdoc, body, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  checkNotif(id_spdoc: any): Observable<any> {
    return this.http
      .get<any>(this.urlCheckNotif + id_spdoc, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
}
