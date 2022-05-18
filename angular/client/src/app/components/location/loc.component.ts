import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LocService } from '../../services/loc.service';
import { User } from '../../interfaces/user.interface';
import { Location } from '../../interfaces/location.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './loc.component.html',
  styleUrls: ['./loc.component.css']
})
export class LocComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  locationList: Observable<Location[]>;

  constructor(private authService: AuthService,
              private locationService: LocService) { }

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

