import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { Product } from './products_entity/product_entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      path: `/uploads/${file.filename}`,
    };
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
