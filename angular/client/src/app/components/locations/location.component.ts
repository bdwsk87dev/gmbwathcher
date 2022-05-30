import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LocationService } from "../../services/location.service";
import { User } from "../../interfaces/user.interface";
import { Location } from "../../interfaces/location.interface";
import { FormControl } from "@angular/forms";
// Pagination
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

  // Pagination

  // Total number of locations
  length = 100;
  // Show locations count per page
  pageSize = 15;
  // Current page
  pageIndex = 0;
  // MatPaginator Output
  pageEvent: PageEvent;

  // Constructor

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
      const filter = {
        'pageSize' : this.pageSize,
        'pageIndex' : this.pageIndex
      }
      // TODO 2 запроса переделать в один
      this.locationList = this.locationService.getLocationList(filter);
      this.locCount = this.locationService.getLocCount();
      console.log(this.locCount);
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
    // Update locations list
    this.getLocations();
  }

}

