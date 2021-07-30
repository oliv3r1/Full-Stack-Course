import { Injectable } from "@angular/core";

@Injectable()
export class ValidateService {
  constructor() {}
  //Checks that user input is valid e.g. all fields are filled
  validateRegister(user) {
    if (
      user.name == undefined ||
      user.email == undefined ||
      user.username == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  //Checks that filled email matches regular expressions
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //Checks that password meets the minimum requirements:
  //length > 8, uppercase letter, lowercase letter, number and special character
  //regex from https://stackoverflow.com/a/60028806
  validatePassword(password) {
    const re =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    return re.test(String(password));
  }

  //Validate that note has content
  checkContent(content) {
    if (content == undefined || content.trim().length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
