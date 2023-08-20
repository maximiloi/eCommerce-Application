import { Customer } from '@commercetools/platform-sdk';

export default class User {
  private static instance: User;

  static created: boolean = false;

  static data: Customer | undefined = undefined;

  private constructor() {
    if (!User.instance) {
      User.instance = User;
    }
  }

  public static newUser(data: Customer) {
    User.created = true;
    this.data = data;
    return User;
  }
}
