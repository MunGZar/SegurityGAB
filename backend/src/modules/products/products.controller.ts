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

/**
 * Controlador para la gestión de productos
 * Maneja operaciones CRUD y carga de archivos
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint para subir archivos
   * Genera nombre aleatorio y almacena en directorio ./uploads
   */
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Genera nombre aleatorio de 32 caracteres hexadecimales
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

  /** Obtener todos los productos */
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  /** Obtener producto por ID */
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  /** Crear nuevo producto */
  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  /** Actualizar producto existente */
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  /** Eliminar producto por ID */
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
