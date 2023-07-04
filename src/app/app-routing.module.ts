import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { MeetupPageComponent } from "./meetup-page/meetup-page/meetup-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { CreatePageComponent } from "./create-page/create-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { MyMeetupsPageComponent } from "./my-meetups-page/my-meetups-page.component";
import { UsersComponent } from "./users/users.component";
import { authUserGuard } from "./guards/auth-user.guard";
import { authAdminGuard } from "./guards/auth-admin.guard";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "/auth", pathMatch: "full" },
      {
        path: "meetups",
        component: HomePageComponent,
        canActivate: [authUserGuard],
      },
      {
        path: "meetup/:id",
        component: MeetupPageComponent,
        canActivate: [authUserGuard],
      },
      { path: "auth", component: LoginPageComponent },
      { path: "about", component: AboutPageComponent },
      {
        path: "create",
        component: CreatePageComponent,
        canActivate: [authUserGuard],
      },
      {
        path: "meetups/edit/:id",
        component: EditPageComponent,
        canActivate: [authUserGuard, authAdminGuard],
      },
      {
        path: "my-meetups",
        component: MyMeetupsPageComponent,
        canActivate: [authUserGuard],
      },
      {
        path: "users",
        component: UsersComponent,
        canActivate: [authUserGuard, authAdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
