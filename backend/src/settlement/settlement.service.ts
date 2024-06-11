import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Settlement } from './entity/settlement.entity';

@Injectable()
export class SettlementService {
  constructor(
    @InjectRepository(Settlement)
    private settlementsRepository: Repository<Settlement>,
  ) {}

  async getLatestSettlement(): Promise<Settlement> {
    return await this.settlementsRepository.findOne({ order: { id: 'DESC' } });
  }

  async createSettlement(
    amount: number,
    status: string,
    lastModifiedBy: string,
  ): Promise<Settlement> {
    const settlement = this.settlementsRepository.create({
      amount,
      status,
      lastModifiedBy,
    });

    return await this.settlementsRepository.save(settlement);
  }
}
