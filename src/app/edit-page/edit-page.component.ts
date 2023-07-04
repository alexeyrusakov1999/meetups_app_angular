import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IMeetupResponse } from "../shared/interfaces";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent implements OnInit {
  meetup: IMeetupResponse;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const meetup = history.state.meetup;
    this.meetup = meetup;
    console.log(meetup);
  }
  submit(meetup: any) {
    console.log("Update Post:", meetup);
  }
}
