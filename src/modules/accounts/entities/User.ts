import { v4 as uuidv4 } from "uuid";

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
  isAdmin?: boolean;
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.isAdmin = false;
      this.created_at = new Date();
    }
  }
}
