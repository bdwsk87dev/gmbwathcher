import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Location } from '../interfaces/location.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  constructor(private http: HttpClient) { }
  getLocationList(): Observable<Location[]> {
    console.log('getLocationList');
    return this.http.get<Location[]>(`${environment.apiUrl}/locations/list`, {});
  }
}

