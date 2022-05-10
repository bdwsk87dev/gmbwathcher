"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterComponent = void 0;
const core_1 = require("@angular/core");
const public_api_1 = require("projects/auth/src/public-api");
const router_1 = require("@angular/router");
let MasterComponent = class MasterComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loggedIn = false;
    }
    ngOnInit() {
        this.loggedIn = !!this.authService.currentUserValue;
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
};
MasterComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-master',
        template: `
    <div class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="fas fa-tasks"></i>&nbsp;Todozz</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/']"
                [routerLinkActiveOptions]="{ exact: true }"
                routerLinkActive="active"
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/todo']"
                [routerLinkActiveOptions]="{ exact: true }"
                routerLinkActive="active"
              >Todo</a
              >
            </li>
            <li *ngIf="loggedIn" class="nav-item">
              <a class="nav-link" (click)="logout()" href="">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <section class="py-5 mt-5">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </section>
  `
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof public_api_1.AuthService !== "undefined" && public_api_1.AuthService) === "function" ? _a : Object, router_1.Router])
], MasterComponent);
exports.MasterComponent = MasterComponent;
//# sourceMappingURL=master.component.js.map