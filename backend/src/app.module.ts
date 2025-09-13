import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/user_entity/user.entity';
import { UsersModule } from './modules/users/users.module';
import { Product } from './modules/products/products_entity/product_entity';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin01@',
      database: 'SegurityGAB',
      entities: [Users, Product],
      synchronize: false,
      logging: true,
    }),
    ProductsModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
