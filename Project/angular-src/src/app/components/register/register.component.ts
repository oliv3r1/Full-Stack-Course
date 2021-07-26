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

    //TODO: Validate password

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
}
