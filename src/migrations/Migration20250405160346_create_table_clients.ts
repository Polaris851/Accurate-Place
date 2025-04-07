import { Migration } from '@mikro-orm/migrations';

export class Migration20250405160346_create_table_clients extends Migration {

  override async up(): Promise<void> {
    return await this.getKnex().schema.createTable("clients", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("cpf").notNullable();
      table.timestamp("created_at").defaultTo(this.getKnex().fn.now());
    });
  }

  override async down(): Promise<void> {
    return await this.getKnex().schema.dropTableIfExists("clients");
  }

}
