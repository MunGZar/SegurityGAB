import { Injectable } from '@nestjs/common';

@Injectable()
export class WishlistService {
  async findByUser(userId: number) {
    // TODO: Implementar lógica para obtener wishlist por usuario
    return [];
  }
}
