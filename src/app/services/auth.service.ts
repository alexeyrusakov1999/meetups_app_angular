import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IUser } from "../shared/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  baseUrl: string = `${environment.baseUrl}/auth`;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userId: number;
  meetupsService: any;
  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return localStorage.getItem("AUTH_TOKEN");
  }

  checkLogin(): void {
    if (localStorage.getItem("AUTH_TOKEN")) {
      const token: any = localStorage.getItem("AUTH_TOKEN");
      const user = this.parseJwt(token);
      this.userId = user.id;

      const role = user?.roles[0].name;

      if (role === "ADMIN") {
        this.isLoggedIn = true;
        this.isAdmin = true;
      } else if (role === "USER") {
        this.isLoggedIn = true;
      } else {
        return;
      }

      this.router.navigate(["/meetups"]);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem("AUTH_TOKEN", res.token);
          }

          const user = this.parseJwt(res.token);
          const role = user?.roles[0].name;
          console.log(role);

          if (role === "ADMIN") {
            this.isLoggedIn = true;
            this.isAdmin = true;
          } else if (role === "USER") {
            this.isLoggedIn = true;
          } else {
            return;
          }

          this.router.navigate(["/meetups"]);

          return null;
        }),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    localStorage.removeItem("AUTH_TOKEN");
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  private handleError(errror: HttpErrorResponse) {
    const message = errror.name;
    switch (message) {
      case "HttpErrorResponse":
        this.error$.next("Вы ввели неверные данные");
        break;
    }
    return throwError(errror);
  }

  isAuthentificated(): boolean {
    return !!this.token;
  }

  parseJwt(token: string) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  private setToken(response: any) {
    console.log(response);
  }
}
