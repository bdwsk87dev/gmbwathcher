import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
export declare class AuthGuard implements CanActivate {
    private router;
    private authService;
    constructor(router: Router, authService: AuthService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
