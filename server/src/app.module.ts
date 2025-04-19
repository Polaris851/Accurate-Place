import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ClientModule } from './module/client/client.module';
import { ReservationModule } from './module/reservation/reservation.module';
import config from "./mikro-orm.config";
import { HostModule } from './module/host/host.module';
import { AuthModule } from './auth/auth.module';
import { Client } from './module/client/entities/client.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature([Client]),
    AuthModule,
    ClientModule,
    ReservationModule,
    HostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
