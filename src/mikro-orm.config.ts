import { MySqlDriver, defineConfig } from "@mikro-orm/mysql"
import { Client } from "./client/entities/client.entity"
import { Migrator } from "@mikro-orm/migrations"

export default defineConfig({
  // entities: ['./dist/entities'],
  // entitiesTs: ['./src/entities'],
  entities: [Client],
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