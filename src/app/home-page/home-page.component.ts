import { Component, OnDestroy, OnInit } from "@angular/core";

import { MeetupsService } from "../services/meetups.service";
import { IMeetupResponse } from "../shared/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  meetups: IMeetupResponse[] = [];
  mSub: Subscription;
  searchTitle: string = "";
  constructor(private meetupsService: MeetupsService) {}

  ngOnInit(): void {
    this.getAllMeetups();
  }

  ngOnDestroy(): void {
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
  }

  getAllMeetups() {
    this.mSub = this.meetupsService.getAll().subscribe(
      (meetups: IMeetupResponse[]) => {
        this.meetups = meetups;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
