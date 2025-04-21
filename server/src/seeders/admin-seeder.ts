import { EntityManager } from "@mikro-orm/mysql";
import { Seeder } from "@mikro-orm/seeder";
import { Client } from "src/module/client/entities/client.entity";
import bcrypt from "bcryptjs";

export class AdminSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const repo = em.getRepository(Client);

        const password = "accurate123";
        const hash = await bcrypt.hash(password, 10);
        
        const admin = repo.create({
            name: "Accurate",
            email: "admin@accurate.com",
            password: hash,
            cpf: "488.222.222-23",
            phone: "(17) 999999999",
            is_admin: true
        });

        await repo.insert(admin);
    }
  }
  