import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities

import { User } from './modules/users/user_entity/user.entity';

import { Product } from './modules/products/products_entity/product_entity';

// Modules
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({

  imports: [
    AuthModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin01@',
      database: 'SegurityGAB',
      entities: [User, Product],
      synchronize: true, // ⚠️ cambia a false en producción
      logging: true,
    }),
 

    UsersModule,

    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
