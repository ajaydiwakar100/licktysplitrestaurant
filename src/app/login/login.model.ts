export class LoginModel {
  public email: String;
  public password: String;

  public accessToken: String;
  public error: String;
  public errorMessage: String;
  public isSelectedCity: String;

  constructor( userName: String, password: String  ) {
      this.email = userName;
      this.password = password;

      return this;
  }
}
