import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostSignUpRequesterRequest } from './dto/post-sign-up-user.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * description :  회원가입 API
   * @param PostSignUpUserRequestDto
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
  @ApiOperation({ summary: '회원가입 API' })
  @ApiBody({
    description: '회원가입 DTO',
    type: PostSignUpRequesterRequest,
  })
  @Post('sign-up')
  postSignUp(@Body() postSignUpRequest: PostSignUpRequesterRequest) {
    return this.userService.createUser(postSignUpRequest);
  }
}
