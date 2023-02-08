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
export class ViewDocumentService {

    constructor(private http: HttpClient) { }

    //Base URL
    base_url: String = baseURL.BASE_URL

    //Routes
    urlShowDocument: any = this.base_url + 'show-sp-document';

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
}