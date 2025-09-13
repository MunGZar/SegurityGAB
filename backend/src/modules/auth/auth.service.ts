import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Users } from '../users/user_entity/user.entity';

@Injectable()
export class AuthService {
    constructor(

        private readonly usersService: UsersService,// genera y verifica tokents
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}
}
