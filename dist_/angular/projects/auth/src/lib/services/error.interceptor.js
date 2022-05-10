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
exports.errorInterceptorProvider = exports.ErrorInterceptor = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("./auth.service");
let ErrorInterceptor = class ErrorInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(request, next) {
        return next.handle(request).pipe((0, operators_1.catchError)((err) => {
            if (err.status === 401 && !window.location.href.includes('/login')) {
                this.authService.logout();
                location.reload();
            }
            const error = err.error.error || err.error.message || err.statusText;
            alert(error);
            return (0, rxjs_1.throwError)(error);
        }));
    }
};
ErrorInterceptor = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ErrorInterceptor);
exports.ErrorInterceptor = ErrorInterceptor;
exports.errorInterceptorProvider = {
    provide: http_1.HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
//# sourceMappingURL=error.interceptor.js.map