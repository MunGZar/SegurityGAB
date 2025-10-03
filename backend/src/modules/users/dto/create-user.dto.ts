import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  // opcional al crear; solo acepta valores permitidos
  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: 'user' | 'admin';
}
