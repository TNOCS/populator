import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyseController } from './analyse/analyse.controller';
import { AnalyseModule } from './analyse/analyse.module';
import { AnalyseService } from './analyse/analyse.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AnalyseModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
