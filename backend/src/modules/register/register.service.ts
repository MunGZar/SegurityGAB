import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user_entity/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(data: CreateUserDto) {
    const { name, email, password, role } = data;

    // Verificar si ya existe
    const userExists = await this.userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role ?? 'user',
    });

    await this.userRepository.save(newUser);

    // Evitamos enviar la contraseña en la respuesta
    const { password: _, ...safeUser } = newUser;

    return {
      message: 'Usuario registrado exitosamente',
      user: safeUser,
    };
  }
}
