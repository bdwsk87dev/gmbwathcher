"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const i18n_1 = require("ng-zorro-antd/i18n");
const i18n_2 = require("ng-zorro-antd/i18n");
const common_1 = require("@angular/common");
const uk_1 = require("@angular/common/locales/uk");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const animations_1 = require("@angular/platform-browser/animations");
const icons_provider_module_1 = require("./icons-provider.module");
const layout_1 = require("ng-zorro-antd/layout");
const menu_1 = require("ng-zorro-antd/menu");
(0, common_1.registerLocaleData)(uk_1.default);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            animations_1.BrowserAnimationsModule,
            icons_provider_module_1.IconsProviderModule,
            layout_1.NzLayoutModule,
            menu_1.NzMenuModule
        ],
        providers: [{ provide: i18n_1.NZ_I18N, useValue: i18n_2.uk_UA }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map