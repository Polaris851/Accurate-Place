import { MySqlDriver, defineConfig } from "@mikro-orm/mysql"
import { Client } from "./module/client/entities/client.entity"
import { Migrator } from "@mikro-orm/migrations"
import { Host } from "./module/host/entities/host.entity"
import { Reservation } from "./module/reservation/entities/reservation.entity"

export default defineConfig({
  // entities: ['./dist/entities'],
  // entitiesTs: ['./src/entities'],
  entities: [
    Client,
    Host,
    Reservation
  ],
  discovery: {
    warnWhenNoEntities: false
  },
  dbName: 'desafio_tecnico',
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  driver: MySqlDriver,
  extensions: [Migrator],
  debug: true
})