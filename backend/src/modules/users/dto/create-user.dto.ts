import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsIn,

  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'El rol debe ser user o admin' })

  role?: 'user' | 'admin';
}
