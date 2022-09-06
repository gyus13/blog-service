import { ApiProperty } from '@nestjs/swagger';

export class PostSignUpRequesterRequest {
  @ApiProperty({
    example: 'user1234',
    description: 'password',
    required: true,
  })
  password: string;
}
