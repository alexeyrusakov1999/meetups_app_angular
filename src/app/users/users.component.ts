import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: any = [];
  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }
}
