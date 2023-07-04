import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Router } from "@angular/router";
import { MeetupsService } from "src/app/services/meetups.service";
import { combineDateTime } from "src/app/shared/interfaces";

@Component({
  selector: "app-meetup-form",
  templateUrl: "./meetup-form.component.html",
  styleUrls: ["./meetup-form.component.scss"],
})
export class MeetupFormComponent {
  isEditPage: boolean = false;
  form: FormGroup;
  @Input() meetup: any;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private meetupsService: MeetupsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      place: [null, Validators.required],
      shortDescription: [null, Validators.required],
      fullDescription: [null, Validators.required],
      fans: [null, Validators.required],
      knowledge: [null, Validators.required],
      future: [null, Validators.required],
      reasons: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.meetup) {
      this.isEditPage = true;
      console.log(
        new Date(this.meetup.time).toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );

      this.form.patchValue({
        title: this.meetup.name,
        date: new Date(this.meetup.time).toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        time: new Date(this.meetup.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        place: this.meetup.location,
        shortDescription: this.meetup.description,
        fullDescription: this.meetup.duration,
        fans: this.meetup.target_audience,
        knowledge: this.meetup.need_to_know,
        future: this.meetup.will_happen,
        reasons: this.meetup.reason_to_come,
      });
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  goToPreviousPage() {
    this.router.navigate(["/meetups"]);
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const postData = {
        name: formData.title,
        time: combineDateTime(formData.date, formData.time),
        location: formData.place,
        description: formData.shortDescription,
        duration: formData.fullDescription,
        target_audience: formData.fans,
        need_to_know: formData.knowledge,
        will_happen: formData.future,
        reason_to_come: formData.reasons,
      };
      if (this.meetup) {
        this.meetupsService.update(this.meetup.id, postData).subscribe(
          (response) => {
            console.log("Update Post:", response);

            this.formSubmit.emit(response);
            this.form.reset();
            this.router.navigate(["/meetups"]);
          },
          (error) => {
            console.log("Update Post Error:", error);
          }
        );
      } else {
        console.log(postData);

        this.meetupsService.create(postData).subscribe(
          (response) => {
            console.log("Create Post:", response);

            this.formSubmit.emit(response);
            this.form.reset();
            this.router.navigate(["/meetups"]);
          },
          (error) => {
            console.log("Create Post Error:", error);
          }
        );
      }
    }
  }

  //     this.form = new FormGroup({
  //       title: new FormControl(null, [Validators.required]),
  //       date: new FormControl(null, [Validators.required]),
  //       time: new FormControl(null, [Validators.required]),
  //       place: new FormControl(null, [Validators.required]),
  //       shortDescription: new FormControl(null, [Validators.required]),
  //       fullDescription: new FormControl(null, [Validators.required]),
  //       fans: new FormControl(null, [Validators.required]),
  //       knowledge: new FormControl(null, [Validators.required]),
  //       future: new FormControl(null, [Validators.required]),
  //       reasons: new FormControl(null, [Validators.required]),
  //     });
  //   }

  // ngOnInit(): void {
  //   this.form = new FormGroup({
  //     title: new FormControl(null, [Validators.required]),
  //     date: new FormControl(null, [Validators.required]),
  //     time: new FormControl(null, [Validators.required]),
  //     place: new FormControl(null, [Validators.required]),
  //     shortDescription: new FormControl(null, [Validators.required]),
  //     fullDescription: new FormControl(null, [Validators.required]),
  //     fans: new FormControl(null, [Validators.required]),
  //     knowledge: new FormControl(null, [Validators.required]),
  //     future: new FormControl(null, [Validators.required]),
  //     reasons: new FormControl(null, [Validators.required]),
  //   });
}
