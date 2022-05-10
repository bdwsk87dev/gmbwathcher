"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const public_api_1 = require("projects/auth/src/public-api");
const master_component_1 = require("./shared/master/master.component");
const home_component_1 = require("./shared/home/home.component");
const auth_guard_1 = require("projects/auth/src/lib/auth.guard");
const public_api_2 = require("projects/todo/src/public-api");
const routes = [
    {
        path: '',
        component: master_component_1.MasterComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: '',
                component: home_component_1.HomeComponent
            },
            {
                path: 'todo',
                component: public_api_2.TodoHomeComponent,
                children: [
                    {
                        path: 'tasks/:id',
                        component: public_api_2.TaskComponent
                    }
                ]
            }
        ]
    },
    {
        path: '',
        children: [
            {
                path: 'login',
                component: public_api_1.LoginComponent
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map