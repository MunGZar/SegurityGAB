import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user_entity/user.entity';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear usuario
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  // Listar todos los usuarios (ideal: solo admin)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Obtener usuario autenticado

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
  const user = await this.usersService.findOne(req.user.id);

  return {
  
    name: user.name,
    email: user.email,
 
  };
}

  // Actualizar cualquier campo del usuario
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, dto);
  }

  // Actualizar solo el rol
  @UseGuards(JwtAuthGuard)
  @Patch(':id/role')
  async updateRole(
    @Param('id') id: number,
    @Body() body: { role: 'user' | 'admin' },
  ): Promise<User> {
    return this.usersService.updateRole(id, body.role);
  }

  // Eliminar usuario
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.usersService.deleteUser(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}
