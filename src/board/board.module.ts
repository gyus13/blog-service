import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { UserEntity } from '../entity/user.entity';
import { BoardEntity } from '../entity/board.entity';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity])],
})
export class BoardModule {}
