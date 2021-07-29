import { Component, OnInit } from "@angular/core";
import { ValidateService } from "app/services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  show: boolean = false;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    //Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 3000,
      });
      return false;
    }

    //Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Invalid email.", {
        cssClass: "alert-danger",
        timeout: 3000,
      });
      return false;
    }

    //Validate password
    if (!this.validateService.validatePassword(user.password)) {
      this.flashMessage.show(
        "The password must contain at least the following: 8 letters, uppercase letter, lowercase letter, number and a special character.",
        {
          cssClass: "alert-danger",
          timeout: 6000,
        }
      );
      return false;
    }

    //Register user and redirect if success
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show("Account created.", {
          cssClass: "alert-success",
          timeout: 3000,
        });
        this.router.navigate(["/login"]);
      } else {
        this.flashMessage.show("Something went wrong.", {
          cssClass: "alert-danger",
          timeout: 3000,
        });
        this.router.navigate(["/register"]);
      }
    });
  }

  //Toggle between hidden/visible password
  //Source: https://stackoverflow.com/a/50438084
  passwordVisibility() {
    this.show = !this.show;
  }
}
