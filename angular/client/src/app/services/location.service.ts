import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  constructor(private http: HttpClient) { }

  getLocationList(filter): Observable<Location[]> {

    // Prepare filter params
    let params = new HttpParams()
      .set("pageSize", filter.pageSize)
      .set("pageIndex", filter.pageIndex)
      .set("orderField", filter.orderField)
      .set("orderAsc", filter.orderAsc)
      .set("searchString", filter.searchString)
      .set("onlyChanges", filter.onlyChanges)

    // Send request
    return this.http.get<Location[]>(`${environment.apiUrl}/locations/list`, { params });
  }

  getLocCount(countFilter): Observable<number>{
    // Prepare filter params
    let params = new HttpParams()
      .set("searchString", countFilter.searchString)
      .set("onlyChanges", countFilter.onlyChanges)

    return this.http.get<number>(`${environment.apiUrl}/locations/count`, { params });
  }

  getLocation(name:string): Observable<Location> {
    return this.http.get<Location>(`${environment.apiUrl}/locations/${name}`, {});
  }
}

