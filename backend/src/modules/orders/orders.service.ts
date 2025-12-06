import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  async findOrdersByUser(userId: number) {
    // TODO: Implementar lógica para obtener órdenes por usuario
    return [];
  }
}
