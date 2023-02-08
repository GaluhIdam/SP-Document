import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from 'src/app/core/services/baseURL';
import { CreateDocument } from 'src/app/core/interfaces/create-sp-document.dto';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class CreateDocumentService {
    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL
    //Routes
    urlLastDocument: any = this.base_url + 'last-sp-document';
    urlCreateDocument: any = this.base_url + 'create-sp-document';

    //Credentials
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Hasura-Client-Name', 'hasura-console')
        .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

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
}