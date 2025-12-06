import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWishlist(@Req() req) {
    const userId = req.user.id;
    return this.wishlistService.findByUser(userId);
  }
}
