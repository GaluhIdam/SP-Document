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
export class EditDocumentSerivice {

    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL

    //Routes
    urlShowDocument: any = this.base_url + 'show-sp-document';
    urlShowDescRemark: any = this.base_url + 'get-desc-remark/';
    urlUpdateDocument: any = this.base_url + 'update-sp-document';
    urlUpdateDescRemark: any = this.base_url + 'update-desc-remark';
    urlDeleteDescRemark: any = this.base_url + 'delete-desc-remark';
    urlAddDescRemark: any = this.base_url + 'add-desc-remark';

    //Credentials
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Hasura-Client-Name', 'hasura-console')
        .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');


    //Get Show Document by ID
    getShowData(id_sp_data: any): Observable<any> {
        return this.http.get<any>(this.urlShowDocument + '/' + id_sp_data, { 'headers': this.headers })
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

    //Get Description & Remark
    getDescRemark(
        id_sp_data: number,
    ): Observable<any> {
        return this.http.get<any>(this.urlShowDescRemark + id_sp_data, { 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response
                }),
                catchError((error) => {
                    console.log(error);
                    throw error;
                })
            )
    }

    //Update SP Document
    updateDocument(
        id_sp_data: number,
        sender_date: Date,
        receiver_unit: String,
        file_location: any
    ): Observable<any> {
        const body = {
            "id_sp_data": id_sp_data,
            "sender_date": sender_date,
            "receiver_unit": receiver_unit,
            "file_location": file_location,
        }

        return this.http.put<any>(this.urlUpdateDocument, body, { 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    throw error;
                })
            )
    }

    //Update Description & Remark
    updateDescRemark(
        id_description_remark: number | null,
        quantity: number,
        description: String,
        remark: String
    ): Observable<any> {
        const body = {
            'id_description_remark': id_description_remark,
            'quantity': quantity,
            'description': description,
            'remark': remark
        }

        return this.http.put<any>(this.urlUpdateDescRemark, body, { 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    throw error;
                })
            )
    }

    deleteDescRemark(
        id_description_remark: number
    ): Observable<any> {

        const params = new HttpParams()
            .set('id_description_remark', id_description_remark);

        return this.http.delete<any>(this.urlDeleteDescRemark, { 'params': params, 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    throw error;
                })
            )
    }

    addDescMark(
        spdata_id: number,
        quantity: number,
        description: String,
        remark: String
    ): Observable<any> {
        const body = {
            'spdata_id': spdata_id,
            'quantity': quantity,
            'description': description,
            'remark': remark,
        }

        return this.http.post<any>(this.urlAddDescRemark, body, { 'headers': this.headers })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    throw error;
                })
            )
    }

}