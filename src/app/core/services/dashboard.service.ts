import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CardSpDocument } from '../interfaces/card-sp-document.dto';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) { }

  urlDashboard = 'http://172.16.41.107:8001/api/rest/get-sp-document';

  getDashboard() {
    return this.http.get<CardSpDocument>(this.urlDashboard);
  }
}