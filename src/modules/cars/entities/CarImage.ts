import { v4 as uuidv4 } from "uuid";

export class CarImage {
  id?: string;
  car_id: string;
  image_name: string;
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.created_at = new Date();
    }
  }
}
