import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "app/services/auth.service";
import { ValidateService } from "app/services/validate.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  user: any;
  notes: Array<any>;
  content: String;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  //Fetch username from localStorage and notes from the database
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.authService.getNotes(this.user).subscribe((content) => {
      this.notes = content.notes;
      console.log(this.notes);
    });
  }

  createNote() {
    const newNote = {
      username: this.user.username,
      note: this.content,
    };

    //Check input validity
    if (this.validateService.checkContent(this.content)) {
      console.log(newNote);

      this.authService.postNote(newNote).subscribe((data) => {
        if (data.success) {
          this.flashMessage.show("Note created!", {
            cssClass: "alert-success",
            timeout: 3000,
          });
          window.location.reload(); //reload current page to display new note
        } else {
          this.flashMessage.show("Something went wrong!", {
            cssClass: "alert-danger",
            timeout: 3000,
          });
        }
      });
    }
  }

  //Delete clicked note from the database and refresh page
  deleteNote(note) {
    console.log(note._id);

    //on success
    window.location.reload();
  }
}
