import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user_entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ----------------------------------------------------
  // CREAR USUARIO
  // ----------------------------------------------------
  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
      role: dto.role ?? 'user',
    });

    return this.usersRepository.save(user);
  }

  // ----------------------------------------------------
  // LISTAR TODOS LOS USUARIOS
  // ----------------------------------------------------
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // ----------------------------------------------------
  // BUSCAR POR EMAIL
  // ----------------------------------------------------
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // ----------------------------------------------------
  // BUSCAR POR ID
  // ----------------------------------------------------
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // ----------------------------------------------------
  // ACTUALIZAR USUARIO
  // ----------------------------------------------------
  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Validar email duplicado
    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.usersRepository.findOne({
        where: { email: dto.email },
      });
      if (emailExists) {
        throw new BadRequestException('El correo ya está registrado');
      }
    }

    // Si actualiza contraseña → encriptar
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);

    return this.usersRepository.save(user);
  }

  // ----------------------------------------------------
  // ACTUALIZAR ROL
  // ----------------------------------------------------
  async updateRole(id: number, role: 'user' | 'admin'): Promise<User> {
    const user = await this.findOne(id);
    user.role = role;
    return this.usersRepository.save(user);
  }

  // ----------------------------------------------------
  // ELIMINAR USUARIO
  // ----------------------------------------------------
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
