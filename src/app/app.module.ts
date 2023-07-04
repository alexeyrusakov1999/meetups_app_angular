import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { MeetupPageComponent } from "./meetup-page/meetup-page/meetup-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { CreatePageComponent } from "./create-page/create-page.component";
import { UsersComponent } from "./users/users.component";
import { MeetupComponent } from "./meetup/meetup.component";
import { UsersPageComponent } from "./users-page/users-page.component";
import { MyMeetupsPageComponent } from "./my-meetups-page/my-meetups-page.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchPipe } from "./pipes/search.pipe";
import { MeetupFormComponent } from "./components/meetup-form/meetup-form.component";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    MeetupPageComponent,
    LoginPageComponent,
    AboutPageComponent,
    AboutPageComponent,
    EditPageComponent,
    CreatePageComponent,
    UsersComponent,
    MeetupComponent,
    UsersPageComponent,
    MyMeetupsPageComponent,
    SearchPipe,
    MeetupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
