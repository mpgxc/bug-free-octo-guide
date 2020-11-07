import { v4 as uuid } from "uuid";

class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);
    id ? id : uuid();
  }
}

export default User;
