import { Module } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { MeasuresController } from './measures.controller';

@Module({
  providers: [MeasuresService],
  controllers: [MeasuresController],
})
export class MeasuresModule {}
