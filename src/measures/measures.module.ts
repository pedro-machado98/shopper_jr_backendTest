import { Module } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { MeasuresController } from './measures.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Utils } from './utils/utils';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports:[PrismaModule, GeminiModule],
  providers: [MeasuresService, Utils],
  controllers: [MeasuresController],
})
export class MeasuresModule {}
