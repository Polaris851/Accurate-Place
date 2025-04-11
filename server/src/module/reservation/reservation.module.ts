import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Reservation } from './entities/reservation.entity';
import { Host } from '../host/entities/host.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [MikroOrmModule.forFeature([
    Reservation,
    Host,
    Client
  ])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
