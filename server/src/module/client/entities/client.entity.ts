import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "../../reservation/entities/reservation.entity";

@Entity({ tableName: "clients"})
export class Client {
  @PrimaryKey()
  id: number;
  
  @Property()
  name: string;

  @Property()
  email: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  phone: string;

  @Property()
  cpf: string;

  @Property({ type: "boolean" })
  is_admin?: boolean = false;

  @Property()
  created_at?: Date = new Date();

  @OneToMany(() => Reservation, "client")
  reservations = new Collection<Reservation>(this);
}
