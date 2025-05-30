import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Req, ForbiddenException } from '@nestjs/common';
import { ClientService } from './client.service';
import { IsLogged } from 'src/auth/decorators/is-logged';
import { IsAdmin } from 'src/auth/decorators/is-admin';
import { Request } from 'src/auth/guards/auth.guard';

@Controller('client')
@IsLogged()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  
  @Get()
  @IsAdmin()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    if (id !== request.user.id && !request.user.is_admin) {
      throw new ForbiddenException("Você não tem permissão");
    }

    return await this.clientService.findOne(id);
  }

  @Delete(':id')
  @IsAdmin()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.remove(id);
  }
}
