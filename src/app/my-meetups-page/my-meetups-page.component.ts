import { Component, OnDestroy, OnInit } from "@angular/core";
import { IMeetupResponse } from "../shared/interfaces";
import { MeetupsService } from "../services/meetups.service";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-my-meetups-page",
  templateUrl: "./my-meetups-page.component.html",
  styleUrls: ["./my-meetups-page.component.scss"],
})
export class MyMeetupsPageComponent implements OnInit, OnDestroy {
  subscribedMeetups: Array<IMeetupResponse> = [];
  mSub: Subscription;

  constructor(
    private meetupsService: MeetupsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSubscribedMeetups();
  }

  ngOnDestroy(): void {
    this.mSub.unsubscribe();
  }

  removeMeetup(meetupId: number | undefined) {
    const index = this.subscribedMeetups.findIndex(
      (meetup) => meetup.id === meetupId
    );
    console.log(this.subscribedMeetups);
    if (index !== -1) {
      this.subscribedMeetups.splice(index, 1);
    }

    console.log(this.subscribedMeetups);
  }

  getSubscribedMeetups() {
    this.mSub = this.meetupsService
      .getAll()
      .subscribe((meetups: IMeetupResponse[]) => {
        meetups.forEach((meetup: IMeetupResponse) => {
          if (
            meetup.users.some(
              (user: any) => user.id === this.authService.userId
            )
          ) {
            this.subscribedMeetups.push(meetup);
          }
        });
      });
  }
}
