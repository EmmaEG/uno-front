export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly token: string;
}

export class User {
  readonly id: string;
  readonly name: string;
  readonly token: string;

  constructor(args: IUser) {
    this.id = args.id;
    this.name = args.name;
    this.token = args.token;
  }
}
