import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '.././../auth/strategies/jwt-auth.guard';
import { RolesGuard } from '../../auth/decoradores/roles.guard';
import { Roles } from '../../auth/decoradores/roles.decoradores';
import {  UpdateUserDto } from './../dto/update-user.dto';
import { CreateUserDto } from './../dto/create-user.dto';

@Controller('admin/items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.adminService.findAll();
  }

  @Post()
  @Roles('admin')
  create(@Body() data: CreateUserDto) {
    return this.adminService.create(data);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.adminService.update(+id, data);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
