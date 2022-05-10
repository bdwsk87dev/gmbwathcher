import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
export declare class LoginComponent implements OnInit {
    private formBuilder;
    private route;
    private router;
    loginForm: FormGroup;
    submitted: boolean;
    returnUrl: string;
    error: string;
    constructor(formBuilder: FormBuilder, route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    get f(): {
        [key: string]: import("@angular/forms").AbstractControl;
    };
    onSubmit(): void;
}
