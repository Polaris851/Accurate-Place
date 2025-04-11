import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "src/module/reservation/entities/reservation.entity";

@Entity({ tableName: "hosts"})
export class Host {
  @PrimaryKey()
  id: number;
  
  @Property()
  name: string;

  @Property()
  type: string;

  @Property({ type: 'text' })
  description?: string;

  @Property({ type: 'decimal' })
  hourly_price: number;

  @Property()
  min_time: number;

  @Property()
  max_time: number;

  @Property()
  createdAt?: Date = new Date();

  @OneToMany(() => Reservation, "host")
  reservations = new Collection<Reservation>(this);

}
