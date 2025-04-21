import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Client } from "../../client/entities/client.entity";
import { Host } from "../../host/entities/host.entity";

@Entity({ tableName: "reservations"})
export class Reservation {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => Client, { persist: false })
  client?: Client;

  @Property()
  client_id: number;

  @ManyToOne(() => Host, { persist: false })
  host?: Host;

  @Property()
  host_id: number;

  @Property()
  start_date: Date;

  @Property()
  end_date: Date;

  @Property({ type: 'decimal' })
  total_price: number;

  @Property()
  status: "active" | "canceled";

  @Property()
  createdAt?: Date = new Date();

  public cancelReservation() {
    this.status = "canceled";
  }
}
