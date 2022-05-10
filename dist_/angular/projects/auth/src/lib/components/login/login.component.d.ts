import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
export declare class LoginComponent implements OnInit {
    private formBuilder;
    private route;
    private router;
    private authService;
    loginForm: FormGroup;
    submitted: boolean;
    returnUrl: string;
    error: string;
    constructor(formBuilder: FormBuilder, route: ActivatedRoute, router: Router, authService: AuthService);
    ngOnInit(): void;
    get f(): {
        [key: string]: import("@angular/forms").AbstractControl;
    };
    onSubmit(): void;
}
