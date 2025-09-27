
import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string; // Recuerda hashear en el servicio antes de guardar

  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: string;
}
