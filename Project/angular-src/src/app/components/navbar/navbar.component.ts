import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  //Log out and remove user and token data from localStorage
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show("Logged out", {
      cssClass: "alert-success",
      timeout: 3000,
    });
    this.router.navigate(["/login"]);
    return false;
  }
}
