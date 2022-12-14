import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'RECRUIT',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      timezone: 'Asia/Seoul',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
