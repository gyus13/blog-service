import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { UserEntity } from '../entity/user.entity';
import { BoardEntity } from '../entity/board.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, BoardEntity]),
  ],
})
export class BoardModule {}
