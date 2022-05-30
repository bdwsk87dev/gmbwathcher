import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LocService } from '../../services/loc.service';
import { User } from '../../interfaces/user.interface';
import { Location } from '../../interfaces/location.interface';

import { ActivatedRoute } from '@angular/router';
import { Change } from "../../interfaces/change.interface";
import { LocationService } from "../../services/location.service";

@Component({
  selector: 'app-profile',
  templateUrl: './loc.component.html',
  styleUrls: ['./loc.component.css']
})
export class LocComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  changesList: Observable<Change[]>;
  locName: string;
  location$: Observable<Location>;

  constructor(private authService: AuthService,
              private locService: LocService,
              private locationService: LocationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
      this.locName = this.route.snapshot.paramMap.get('name');
      this.changesList = this.locService.getChangesList(this.locName);

      // Get location
      this.location$ = this.locationService.getLocation(this.locName);

    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

