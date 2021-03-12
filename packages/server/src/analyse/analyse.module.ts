import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Verblijfsobject from '../database/entities/verblijfsobject.entity';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Verblijfsobject])],
  controllers: [AnalyseController],
  providers: [AnalyseService],
})
export class AnalyseModule {}
