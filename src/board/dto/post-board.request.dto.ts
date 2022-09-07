import { ApiProperty } from '@nestjs/swagger';

export class PostBoardRequesterRequest {
  @ApiProperty({
    example: 'user1234',
    description: 'password',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: '제목',
    description: 'title',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: '내용',
    description: 'text',
    required: true,
  })
  text: string;
}
