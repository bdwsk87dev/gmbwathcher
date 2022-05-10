"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconsProviderModule = void 0;
const core_1 = require("@angular/core");
const icon_1 = require("ng-zorro-antd/icon");
const icons_1 = require("@ant-design/icons-angular/icons");
const icons = [icons_1.MenuFoldOutline, icons_1.MenuUnfoldOutline, icons_1.DashboardOutline, icons_1.FormOutline];
let IconsProviderModule = class IconsProviderModule {
};
IconsProviderModule = __decorate([
    (0, core_1.NgModule)({
        imports: [icon_1.NzIconModule],
        exports: [icon_1.NzIconModule],
        providers: [
            { provide: icon_1.NZ_ICONS, useValue: icons }
        ]
    })
], IconsProviderModule);
exports.IconsProviderModule = IconsProviderModule;
//# sourceMappingURL=icons-provider.module.js.map