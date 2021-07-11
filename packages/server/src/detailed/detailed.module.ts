import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { DetailedController } from './detailed.controller';
import { DetailedService } from './detailed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pandactueelbestaand])],
  controllers: [DetailedController],
  providers: [DetailedService],
})
export class DetailedModule {}
