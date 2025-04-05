import { PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

export class Location {
  @PrimaryKey()
  id: string = v4();
  
  @Property()
  name: string;

  @Property()
  type: string;

  @Property()
  description?: string;

  @Property({ type: 'decimal' })
  hourly_price: number;

  @Property()
  min_time: number;

  @Property()
  max_time: number;

  @Property()
  created_date?: Date = new Date();
}
