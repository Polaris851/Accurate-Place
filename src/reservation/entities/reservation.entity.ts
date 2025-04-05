import { PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";

export class Reservation {
  @PrimaryKey()
  id: string = v4();
}
