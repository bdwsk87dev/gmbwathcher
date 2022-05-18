import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Location } from '../interfaces/location.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocService {
  constructor(private http: HttpClient) { }
  getLocationList(): Observable<Location[]> {
    return this.http.post<Location[]>(`${environment.apiUrl}/locations/list`, {Authorization: 'ssss'});
  }
}

