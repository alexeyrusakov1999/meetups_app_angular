import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${environment.baseUrl}/user`);
  }
}
