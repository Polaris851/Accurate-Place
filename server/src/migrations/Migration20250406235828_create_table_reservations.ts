import { Migration } from '@mikro-orm/migrations';

export class Migration20250406235828_create_table_reservations extends Migration {

  override async up(): Promise<void> {
    return await this.getKnex().schema.createTable("reservations", (table) => {
      table.increments("id").primary();
      table.integer("client_id").unsigned();
      table.integer("host_id").unsigned();
      table.dateTime("start_date").notNullable();
      table.dateTime("end_date").notNullable();
      table.decimal("total_price").notNullable();
      table.string("status").notNullable();
      table.timestamp("created_at").defaultTo(this.getKnex().fn.now());

      table.foreign("client_id").references("clients.id").onDelete("CASCADE");
      table.foreign("host_id").references("hosts.id").onDelete("CASCADE");
    });
  }

  override async down(): Promise<void> {
    return await this.getKnex().schema.dropTableIfExists("reservations");

  }

}
