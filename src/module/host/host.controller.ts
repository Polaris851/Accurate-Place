import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { HostService } from './host.service';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  async create(@Body() createHostDto: CreateHostDto) {
    return await this.hostService.create(createHostDto);
  }

  @Get()
  async findAll() {
    return await this.hostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.hostService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateHostDto: UpdateHostDto) {
    return await this.hostService.update(id, updateHostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.hostService.remove(id);
  }
}
