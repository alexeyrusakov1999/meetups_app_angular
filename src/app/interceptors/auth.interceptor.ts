import { catchError } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { environment } from "../environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = this.authService.token;
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request).pipe(
      tap(() => {}),
      catchError((error: HttpErrorResponse) => {
        console.log("Interceptor Error:", error);
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
