import { PartialType } from '@nestjs/mapped-types';
import { CreateHostDto } from './create-host.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateHostDto extends PartialType(CreateHostDto) {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O tipo deve ser uma string.' })
  type?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O valor da hora deve ser numérico.' })
  @IsPositive({ message: 'O valor da hora deve ser positivo.' })
  hourly_price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O tempo mínimo deve ser numérico.' })
  min_time?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O tempo máximo deve ser numérico.' })
  max_time?: number;
}
