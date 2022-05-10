import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export declare class WelcomeComponent implements OnInit {
    private http;
    items$: Observable<Item[]>;
    constructor(http: HttpClient);
    ngOnInit(): void;
    getItems(): Observable<Item[]>;
}
interface Item {
    name: string;
    age: number;
    address: string;
}
export {};
