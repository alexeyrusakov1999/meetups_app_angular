import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMeetup, combineDateTime } from "../shared/interfaces";
import { MeetupsService } from "../services/meetups.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.scss"],
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  constructor(private meetupsService: MeetupsService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
      shortDescription: new FormControl(null, [Validators.required]),
      fullDescription: new FormControl(null, [Validators.required]),
      fans: new FormControl(null, [Validators.required]),
      knowledge: new FormControl(null, [Validators.required]),
      future: new FormControl(null, [Validators.required]),
      reasons: new FormControl(null, [Validators.required]),
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  goToPreviousPage() {
    this.router.navigate(["/meetups"]);
  }

  onFormSubmit(postData: any) {
    console.log("Create Post:", postData);
  }
}
