import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StockService } from "../service/stock.service";
import { Roles } from "../../auth/roles/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Role } from '../../auth/roles/role.interface';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all stocks' })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllStocks() {
    return await this.stockService.getAllStocks();
  }

}
