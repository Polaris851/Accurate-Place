import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
