import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IMeetupResponse } from "../shared/interfaces";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AuthService } from "../services/auth.service";
import { MeetupsService } from "../services/meetups.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-meetup",
  templateUrl: "./meetup.component.html",
  styleUrls: ["./meetup.component.scss"],
  animations: [
    trigger("bodyExpansion", [
      state("collapsed, void", style({ height: "0px", visibility: "hidden" })),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed, void => collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class MeetupComponent implements OnInit {
  state = "collapsed";
  isSub: boolean;
  constructor(
    private authService: AuthService,
    private meetupsService: MeetupsService,
    private router: Router
  ) {}
  @Input() meetup: IMeetupResponse;
  @Input() subscribedMeetups: Array<IMeetupResponse>;
  @Output() removeMeetup: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.isSubscribed(this.meetup);
  }

  removeMyMeetup(meetupId: number | undefined) {
    if (!this.subscribedMeetups) return;
    const index = this.subscribedMeetups.findIndex(
      (meetup) => meetup.id === meetupId
    );
    if (index !== -1) {
      this.subscribedMeetups.splice(index, 1);
    }
  }

  isFinished(): boolean {
    const meetupTime = new Date(this.meetup.time);
    const currentTime = new Date();
    if (currentTime > meetupTime) {
      return true;
    } else {
      return false;
    }
  }

  toggleSubsAndRemoveFromMyMeetups(meetupId: number | undefined, meetup: any) {
    this.toggleSubscription(meetupId, meetup);
    this.removeMyMeetup(meetupId);
  }

  toggle(): void {
    this.state = this.state === "collapsed" ? "expanded" : "collapsed";
  }

  onEditMeetup(meetup: IMeetupResponse) {
    this.router.navigate(["/meetups/edit", meetup.id], { state: { meetup } });
  }

  isSubscribed(meetup: IMeetupResponse) {
    this.isSub = meetup.users.some(
      (user: any) => user.id === this.authService.userId
    );

    return this.isSub;
  }

  subscribe(meetupId: number) {
    const data = {
      idMeetup: meetupId,
      idUser: this.authService.userId,
    };
    this.meetupsService.subscribeToMeetup(data).subscribe(
      () => {
        console.log("Подписка добавлена");

        this.isSub = true;
      },
      (error) => {
        console.error("Ошибка подписки:", error);
      }
    );
  }

  unsubscribe(meetupId: number) {
    const data = {
      idMeetup: meetupId,
      idUser: this.authService.userId,
    };
    this.meetupsService.unsubscribeToMeetup(data).subscribe(
      () => {
        console.log("Подписка удалена");
        this.isSub = false;
      },
      (error) => {
        console.error("Ошибка отписки:", error);
      }
    );
  }

  toggleSubscription(meetupId: any, meetup: IMeetupResponse) {
    if (this.isSub) {
      this.unsubscribe(meetupId);
    } else {
      this.subscribe(meetupId);
    }
  }

  isAdmin() {
    return this.authService.isAdmin;
  }
}
