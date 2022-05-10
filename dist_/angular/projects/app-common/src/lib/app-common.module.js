"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommonModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const router_1 = require("@angular/router");
let AppCommonModule = class AppCommonModule {
};
AppCommonModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule
        ]
    })
], AppCommonModule);
exports.AppCommonModule = AppCommonModule;
//# sourceMappingURL=app-common.module.js.map