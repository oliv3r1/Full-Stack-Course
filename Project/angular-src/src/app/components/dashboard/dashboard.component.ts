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
    });
  }

  createNote() {
    const newNote = {
      username: this.user.username,
      note: this.content,
    };

    //Check input validity
    if (this.validateService.checkContent(this.content)) {
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
    const noteId = note._id;
    this.authService.deleteNote(noteId).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-success",
          timeout: 3000,
        });

        window.location.reload(); //reload current page
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000,
        });
      }
    });
  }
}
