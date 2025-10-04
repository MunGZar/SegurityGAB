import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';

@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Obtener todos los usuarios
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // Crear usuario
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.adminService.create(data);
  }

  // Actualizar usuario
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.adminService.update(Number(id), data);
  }

  // Eliminar usuario
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(Number(id));
  }
}
