import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';
import { User } from '../../interfaces/user.interface';
import { Location } from '../../interfaces/location.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  locationList: Observable<Location[]>;

  // dp
  startDate = new Date(1990, 0, 1);

  constructor(private authService: AuthService,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
      this.locationList = this.locationService.getLocationList();
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

