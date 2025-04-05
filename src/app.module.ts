import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ClientModule } from './client/client.module';
import { ReservationModule } from './reservation/reservation.module';
import { LocationModule } from './location/location.module';
import config from "./mikro-orm.config";

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    ClientModule,
    ReservationModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
