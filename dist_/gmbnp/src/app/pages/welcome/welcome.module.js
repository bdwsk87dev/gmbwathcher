"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeModule = void 0;
const core_1 = require("@angular/core");
const welcome_routing_module_1 = require("./welcome-routing.module");
const welcome_component_1 = require("./welcome.component");
const table_1 = require("ng-zorro-antd/table");
const common_1 = require("@angular/common");
let WelcomeModule = class WelcomeModule {
};
WelcomeModule = __decorate([
    (0, core_1.NgModule)({
        imports: [
            welcome_routing_module_1.WelcomeRoutingModule,
            table_1.NzTableModule,
            common_1.CommonModule
        ],
        declarations: [welcome_component_1.WelcomeComponent],
        exports: [welcome_component_1.WelcomeComponent]
    })
], WelcomeModule);
exports.WelcomeModule = WelcomeModule;
//# sourceMappingURL=welcome.module.js.map