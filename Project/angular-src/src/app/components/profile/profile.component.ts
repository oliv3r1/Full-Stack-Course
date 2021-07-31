import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private authService: AuthService, private router: Router) {}

  //Load User to display its information on the page when page is loaded
  ngOnInit() {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.user = profile.user;
      },
      (err) => {
        console.log(err);

        return false;
      }
    );
  }
}
