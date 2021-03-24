import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Verblijfsobject])],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
