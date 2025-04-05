import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ tableName: "clients"})
export class Client {
  @PrimaryKey()
  id: string = v4();
  
  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property()
  cpf: string;

  @Property()
  created_date?: Date = new Date();
}
