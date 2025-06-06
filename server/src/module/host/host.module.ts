import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Host } from './entities/host.entity';
import { Reservation } from '../reservation/entities/reservation.entity';

@Module({
  imports: [MikroOrmModule.forFeature([
    Host,
    Reservation
  ])],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
