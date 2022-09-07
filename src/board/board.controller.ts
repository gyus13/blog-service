import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiQuery, ApiResponse} from '@nestjs/swagger';
import { PostSignUpRequesterRequest } from '../user/dto/post-sign-up-user.request.dto';
import { PostBoardRequest } from './dto/post-board.request.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
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

  /**
   * description : 게시글 수정 API
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
  @ApiOperation({ summary: '게시글 수정 API' })
  @ApiBody({
    description: '게시글 수정 DTO',
    type: PostBoardRequest,
  })
  @Patch(':/id')
  PatchBoard(
    @Body() postBoardRequest: PostBoardRequest,
    @Param('id') id: number,
  ) {
    return this.boardService.editBoard(postBoardRequest, id);
  }

  /**
   * description : 게시글 삭 API
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
  @ApiOperation({ summary: '게시글 삭제 API' })
  @ApiBody({
    description: '게시글 삭제 DTO',
    type: PostBoardRequest,
  })
  @Delete(':/id')
  DeleteBoard(
    @Body() postBoardRequest: PostBoardRequest,
    @Param('id') id: number,
  ) {
    return this.boardService.deleteBoard(postBoardRequest, id);
  }

  /**
   * description : 게시글 조회 API
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
  @ApiQuery({
    name: 'createdAt',
    description: 'createdAt',
    type: Date,
    required: false,
  })
  @ApiOperation({ summary: '게시글 조회 API' })
  @Get()
  async find(@Query('createdAt') date) {
    return await this.boardService.retrieveBoard(date);
  }
}
