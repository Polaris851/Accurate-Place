import { MySqlDriver, defineConfig } from "@mikro-orm/mysql"
import { Client } from "./module/client/entities/client.entity"
import { Migrator } from "@mikro-orm/migrations"
import { Host } from "./module/host/entities/host.entity"
import { Reservation } from "./module/reservation/entities/reservation.entity"
import { config } from "dotenv"
import { SeedManager } from "@mikro-orm/seeder"

config()

export default defineConfig({
  entities: [
    Client,
    Host,
    Reservation
  ],
  seeder: {
    path: "dist/seeders",
    pathTs: "src/seeders"
  },
  discovery: {
    warnWhenNoEntities: false
  },
  pool: {
    min: 4
  },
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  driver: MySqlDriver,
  extensions: [Migrator, SeedManager],
  debug: true
})