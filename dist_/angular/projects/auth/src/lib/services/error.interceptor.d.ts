import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export declare class ErrorInterceptor implements HttpInterceptor {
    private authService;
    constructor(authService: AuthService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
export declare const errorInterceptorProvider: {
    provide: import("@angular/core").InjectionToken<HttpInterceptor[]>;
    useClass: typeof ErrorInterceptor;
    multi: boolean;
};
