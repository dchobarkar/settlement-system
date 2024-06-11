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
    const activeSettlement = await this.settlementsRepository.findOne({
      where: [{ status: 'PENDING' }, { status: 'DISPUTE' }],
      order: { id: 'DESC' },
    });
    console.log(activeSettlement);
    if (activeSettlement) return activeSettlement;

    return { id: null, amount: 0, status: '', lastModifiedBy: '' };
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

  async updateSettlement(
    id: number,
    amount: number,
    status: string,
    lastModifiedBy: string,
  ): Promise<Settlement> {
    await this.settlementsRepository.update(id, {
      amount,
      status,
      lastModifiedBy,
    });

    return this.settlementsRepository.findOne({
      where: { id },
    });
  }
}
