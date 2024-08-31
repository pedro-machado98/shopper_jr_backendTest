import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasuresModule } from './measures/measures.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GeminiModule } from './gemini/gemini.module';


@Module({
  imports: [MeasuresModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    PrismaModule,
    GeminiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
