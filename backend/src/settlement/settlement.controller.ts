import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';

import { Settlement } from './entity/settlement.entity';
import { SettlementService } from './settlement.service';

@Controller('settlement')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Get()
  async getLatestSettlement(): Promise<Settlement> {
    return await this.settlementService.getLatestSettlement();
  }

  @Post()
  async createSettlement(
    @Body('amount') amount: number,
    @Body('status') status: string,
    @Body('lastModifiedBy') lastModifiedBy: string,
  ): Promise<Settlement> {
    return await this.settlementService.createSettlement(
      amount,
      status,
      lastModifiedBy,
    );
  }

  @Patch(':id')
  async updateSettlement(
    @Param('id') id: number,
    @Body('amount') amount: number,
    @Body('status') status: string,
    @Body('lastModifiedBy') lastModifiedBy: string,
  ): Promise<Settlement> {
    return await this.settlementService.updateSettlement(
      id,
      amount,
      status,
      lastModifiedBy,
    );
  }
}
