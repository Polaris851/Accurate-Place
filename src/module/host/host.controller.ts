import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { HostService } from './host.service';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('available')
  async getAvailableHosts(@Query('start_date') start_date: string, @Query('end_date') end_date: string) {
    return await this.hostService.getAvailableHosts(start_date, end_date);
  }

  @Post()
  async create(@Body() createHostDto: CreateHostDto) {
    return await this.hostService.create(createHostDto);
  }

  @Get()
  async findAll() {
    return await this.hostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.hostService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateHostDto: UpdateHostDto) {
    return await this.hostService.update(id, updateHostDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.hostService.remove(id);
  }
}
