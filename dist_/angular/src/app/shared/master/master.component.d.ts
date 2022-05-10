import { OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { Router } from '@angular/router';
export declare class MasterComponent implements OnInit {
    private readonly authService;
    private readonly router;
    loggedIn: boolean;
    constructor(authService: AuthService, router: Router);
    ngOnInit(): void;
    logout(): void;
}
