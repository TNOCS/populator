import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buurten } from '../common/entities/buurten.entity';
import { SummarisedController } from './summarised.controller';
import { SummarisedService } from './summarised.service';

@Module({
  imports: [TypeOrmModule.forFeature([Buurten])],
  controllers: [SummarisedController],
  providers: [SummarisedService],
})
export class SummarisedModule {}
