import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateHostDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsString({ message: 'O tipo deve ser uma string.' })
  type: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;

  @IsNotEmpty({ message: 'O valor da hora é obrigatório.' })
  @IsNumber({}, { message: 'O valor da hora deve ser numérico.' })
  @IsPositive({ message: 'O valor da hora deve ser positivo.' })
  hourly_price: number;

  @IsNotEmpty({ message: 'O tempo mínimo é obrigatório.' })
  @IsNumber({}, { message: 'O tempo mínimo deve ser numérico.' })
  min_time: number;

  @IsNotEmpty({ message: 'O tempo máximo é obrigatório.' })
  @IsNumber({}, { message: 'O tempo máximo deve ser numérico.' })
  max_time: number;
}
