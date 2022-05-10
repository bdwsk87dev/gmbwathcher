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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const http_1 = require("@angular/common/http");
const operators_1 = require("rxjs/operators");
let WelcomeComponent = class WelcomeComponent {
    constructor(http) {
        this.http = http;
        this.items$ = (0, rxjs_1.of)([
            { name: 'Вася', age: 24, address: 'Москва' },
            { name: 'Петя', age: 23, address: 'Лондон' },
            { name: 'Миша', age: 21, address: 'Париж' },
            { name: 'Вова', age: 23, address: 'Сидней' }
        ]);
    }
    ngOnInit() {
    }
    getItems() {
        return this.http.get('/api/items').pipe((0, operators_1.share)());
    }
};
WelcomeComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-welcome',
        templateUrl: './welcome.component.html',
        styleUrls: ['./welcome.component.scss']
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map