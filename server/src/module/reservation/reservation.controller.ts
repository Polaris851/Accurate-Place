import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Req, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { IsLogged } from 'src/auth/decorators/is-logged';
import { Request } from 'src/auth/guards/auth.guard';
import { IsAdmin } from 'src/auth/decorators/is-admin';

@Controller('reservation')
@IsLogged()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationService.create(createReservationDto);
  }

  @Get()
  @IsAdmin()
  async findAll(@Query("hostId") hostId?: string) {
    if (hostId !== undefined) {
      return await this.reservationService.findByHostId(+hostId);
    }

    return await this.reservationService.findAll();
  }

  @Get("/my-reservations")
  public async myReservations(@Req() request: Request) {
    const user = request.user;

    const reservations = await this.reservationService.findByUser(user);

    return reservations;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateReservationDto: UpdateReservationDto) {
    return await this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.remove(id);
  }
}
