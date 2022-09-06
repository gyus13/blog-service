import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity('BOARD')
export class BoardEntity extends CommonEntity {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column()
  weather: string;

  @ApiProperty({ description: '작성자' })
  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;
}
