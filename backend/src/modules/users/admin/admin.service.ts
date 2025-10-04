import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../user_entity/user.entity';
import * as bcrypt from 'bcrypt';
import {  UpdateUserDto } from './../dto/update-user.dto';
import { CreateUserDto } from './../dto/create-user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<any> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userRepo.update(id, data);
  }

  async remove(id: number): Promise<any> {
    return this.userRepo.delete(id);
  }
}
