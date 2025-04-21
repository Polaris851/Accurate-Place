import { EntityManager } from "@mikro-orm/mysql";
import { Seeder } from "@mikro-orm/seeder";
import { Host } from "src/module/host/entities/host.entity";
import { faker } from '@faker-js/faker';

export class HostSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const repo = em.getRepository(Host);
        
        const hosts: Host[] = [];

        for (let i = 0; i < 6; i++) {
            const maxTime = faker.number.int({
                min: 3,
                max: 10
            });
            const minTime = maxTime - 2;

            const host = repo.create({
                hourly_price: faker.number.int({
                    min: 5,
                    max: 15
                }),
                max_time: maxTime,
                min_time: minTime,
                name: faker.location.city(),
                type: faker.helpers.arrayElement([
                    "home",
                    "apartment",
                    "hotel",
                    "farm",
                    "cabin"
                ])
            });

            hosts.push(host);
        }

        // await em.insertMany(hosts);
    }
  }
  