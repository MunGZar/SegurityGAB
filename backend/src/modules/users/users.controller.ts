import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user_entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear usuario
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  // Listar todos los usuarios
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Actualizar rol de un usuario
  @Patch(':id/role')
  async updateRole(
    @Param('id') id: number,
    @Body() body: { role: 'user' | 'admin' },
  ): Promise<User> {
    return this.usersService.updateRole(id, body.role);
  }
}
