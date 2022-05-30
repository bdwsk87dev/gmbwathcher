import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Change } from "../interfaces/change.interface";

@Injectable({
  providedIn: 'root'
})

export class LocService {
  constructor(private http: HttpClient) { }
  getChangesList(name:string): Observable<Change[]> {
    return this.http.get<Change[]>(`${environment.apiUrl}/changes/${name}`, {});
  }


}

