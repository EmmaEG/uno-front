export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly token: string;
  readonly role: string;
}

export class User {
  readonly id: string;
  readonly name: string;
  readonly token: string;
  readonly role: string;

  constructor(args: IUser) {
    this.id = args.id;
    this.name = args.name;
    this.token = args.token;
    this.role = args.role;
  }
}
