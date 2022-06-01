import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LocationService } from "../../services/location.service";
import { User } from "../../interfaces/user.interface";
import { Location } from "../../interfaces/location.interface";
import { FormControl } from "@angular/forms";
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: "app-profile",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  locationList: Observable<Location[]>;
  locCount : Observable<number>;

  // date = new FormControl(new Date());
  // serializedDate = new FormControl(new Date().toISOString());

  /*
   * Pagination
   */
  // Total number of locations
  length = 100;
  // Show locations count per page
  pageSize = 15;
  // Current page
  pageIndex = 0;
  // MatPaginator Output
  pageEvent: PageEvent;


  /*
   * Order by and asc / desc
   */

  // "Order by" Field
  orderField = 'count';
  // True is asc false is desc
  orderAsc: boolean;

  /*
   * Other
   */

  // Input text for search
  searchString = '';
  // Display only locations with changes
  onlyChanges = false;

  constructor(private authService: AuthService,
              private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.getLocations();
  }

  /**
   * Get locations method from nest
   */
  getLocations(): void{
    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;

      this.locationList = this.locationService.getLocationList({
        'pageSize' : this.pageSize,
        'pageIndex' : this.pageIndex,
        'orderField': this.orderField,
        'orderAsc': this.orderAsc == true? 'asc' : 'desc',
        'searchString': this.searchString,
        'onlyChanges': this.onlyChanges,
      });

      this.locCount = this.locationService.getLocCount({
        'searchString': this.searchString,
        'onlyChanges': this.onlyChanges
      });

    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  /**
   *
   * @param event
   */
  handlePageEvent(event: PageEvent) {
    // Change pagination params
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getLocations();
  }

  changeOrderField(field){
    this.orderField = field;
    this.orderAsc = !this.orderAsc;
    this.pageIndex = 0;
    this.getLocations();
  }

  handleSearchEvent(event){
    this.searchString = event.target.value;
    this.getLocations();
  }

  onlyChangesToogle(onlyChanges: boolean){
    this.onlyChanges = onlyChanges;
    this.getLocations();
  }

}

