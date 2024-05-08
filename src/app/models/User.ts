export class User {
    id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmed: boolean;
    constructor(
      id: string = '',
      name: string = '',
      surname: string = '',
      phoneNumber: string = '',
      email: string = '',
      password: string = '',
      confirmed: boolean = false
    ) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.password = password;
      this.confirmed = confirmed;
    }
  }
  