import { Migration } from '@mikro-orm/migrations';

export class Migration20250406190124_create_table_hosts extends Migration {

  override async up(): Promise<void> {
    return await this.getKnex().schema.createTable("hosts", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("type").notNullable();
      table.text("description");
      table.decimal("hourly_price").notNullable();
      table.integer("min_time").notNullable();
      table.integer("max_time").notNullable();
      table.timestamp("created_at").defaultTo(this.getKnex().fn.now());
    });
  }

  override async down(): Promise<void> {
    return await this.getKnex().schema.dropTableIfExists("hosts");
  }

}
