import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email?: string;

  @IsOptional()
  @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, { message: 'O telefone deve estar no formato válido'})
  phone?: string;

  @IsOptional()
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: 'CPF é inválido'})
  cpf?: string;
}
