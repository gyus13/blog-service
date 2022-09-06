import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity('USER')
export class UserEntity extends CommonEntity {
  @ApiProperty()
  @Column()
  password: string;
}
