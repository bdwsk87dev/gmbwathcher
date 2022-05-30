import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { TokenInterceptor } from "./services/token.interceptor";
import { LocationComponent } from "./components/locations/location.component";
import { LocComponent } from "./components/location/loc.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// import { MatNativeDateModule } from '@angular/material/core';
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatDatepickerModule } from "@angular/material/datepicker";
// import { MatInputModule } from '@angular/material/input';

import { MaterialExampleModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    LocationComponent,
    LocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatNativeDateModule,
    // MatFormFieldModule,
    // MatDatepickerModule,
    // MatInputModule
    MaterialExampleModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
