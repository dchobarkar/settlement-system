import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Settlement } from './settlement/entity/settlement.entity';
import { SettlementController } from './settlement/settlement.controller';
import { SettlementService } from './settlement/settlement.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Settlement],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Settlement]),
  ],
  controllers: [AppController, SettlementController],
  providers: [AppService, SettlementService],
})
export class AppModule {}
