import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface ApplicationUser {
    accessToken: string;
    expiresIn: Date;
    username: string;
}
export declare class AuthService {
    private readonly http;
    private currentUserSubject;
    currentUser: Observable<ApplicationUser>;
    constructor(http: HttpClient);
    get currentUserValue(): ApplicationUser;
    login(username: string, password: string): Observable<any>;
    logout(): void;
}
