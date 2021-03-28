import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';
import Pand from '../common/entities/pand.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { Buurten } from '../common/entities/buurten.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verblijfsobject, Buurten])],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
