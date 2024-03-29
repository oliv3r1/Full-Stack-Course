import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) {}

  //Reach back-end to register
  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:8080/users/register", user, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  // Reach back-end to authenticate user
  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:8080/users/authenticate", user, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");

    return this.http
      .get("http://localhost:8080/users/profile", { headers: headers })
      .map((res) => res.json());
  }

  getNotes(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .post("http://localhost:8080/notes/fetch", user, { headers: headers })
      .map((res) => res.json());
  }

  postNote(note) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .post("http://localhost:8080/notes/post", note, {
        headers: headers,
      })
      .map((res) => res.json());
  }

  //Source for sending request body:
  //https://stackoverflow.com/a/40857437
  deleteNote(noteId) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .delete("http://localhost:8080/notes/del", {
        headers: headers,
        body: { _id: noteId },
      })
      .map((res) => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  //Check if logged in and session not expired
  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
