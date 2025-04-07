import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsOptional()
  client_id?: number;

  @IsOptional()
  host_id?: number;

  @IsOptional()
  start_date?: Date;

  @IsOptional()
  end_date?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'O valor final deve ser numérico.' })
  @IsPositive({ message: 'O valor final deve ser positivo.' })
  total_price?: number;

  @IsOptional()
  @IsString({ message: 'A situação deve ser uma string.' })
  status?: string;
}
