import { ApiProperty } from '@nestjs/swagger';

export class PostBoardRequesterRequest {
    @ApiProperty({
        example: 'user1234',
        description: 'password',
        required: true,
    })
    password: string;
}
