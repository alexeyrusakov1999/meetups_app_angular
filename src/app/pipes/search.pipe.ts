import { Pipe, PipeTransform } from "@angular/core";
import { IMeetup, IMeetupResponse } from "../shared/interfaces";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(meetups: IMeetupResponse[], search = ""): IMeetupResponse[] {
    if (!search.trim()) {
      return meetups;
    }

    return meetups.filter((meetup) => {
      return meetup.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
