import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IMeetup,
  IMeetupResponse,
  ISubscriptionData,
} from "../shared/interfaces";
import { Observable } from "rxjs";
import { environment } from "../environment";

@Injectable({
  providedIn: "root",
})
export class MeetupsService {
  constructor(private http: HttpClient) {}

  create(meetup: IMeetup): Observable<IMeetup> {
    return this.http.post<IMeetup>(`${environment.baseUrl}/meetup`, meetup);
  }

  getMeetupById(id: number): Observable<IMeetupResponse | undefined> {
    return this.getAll().pipe(
      map((meetups) => meetups.find((meetup) => meetup.id === id))
    );
  }

  update(meetupId: number, meetupData: any): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/meetup/${meetupId}`,
      meetupData
    );
  }

  getAll(): Observable<IMeetupResponse[]> {
    return this.http.get<IMeetupResponse[]>(`${environment.baseUrl}/meetup`);
  }

  subscribeToMeetup(subscriptionData: ISubscriptionData) {
    return this.http.put(`${environment.baseUrl}/meetup`, subscriptionData);
  }

  unsubscribeToMeetup(subscriptionData: ISubscriptionData) {
    return this.http.delete(`${environment.baseUrl}/meetup`, {
      body: subscriptionData,
    });
  }
}
