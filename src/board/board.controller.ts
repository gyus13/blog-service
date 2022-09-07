import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostSignUpRequesterRequest } from '../user/dto/post-sign-up-user.request.dto';
import { PostBoardRequest } from './dto/post-board.request.dto';

@Controller('board')
export class BoardController {
  /**
   * description : 게시글 생성 API
   * @param PostBoardRequestDto
   * @returns non-exist
   */
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 권한 입니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '게시글 생성 API' })
  @ApiBody({
    description: '게시글 생성 DTO',
    type: PostBoardRequest,
  })
  @Post()
  postSignUp(@Body() postBoardRequest: PostBoardRequest) {
    return this.boardService.createBoard(postBoardRequest);
  }
}
