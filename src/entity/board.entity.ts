import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  password: string;

  @ApiProperty()
  @Column()
  weather: string;
}
