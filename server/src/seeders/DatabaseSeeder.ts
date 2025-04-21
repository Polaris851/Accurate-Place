import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { AdminSeeder } from './admin-seeder';
import { HostSeeder } from './host-seeder';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    this.call(em, [
      AdminSeeder,
      HostSeeder
    ]);
  }

}
