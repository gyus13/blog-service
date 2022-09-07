import {Body, Controller, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {PostSignUpRequesterRequest} from "../user/dto/post-sign-up-user.request.dto";

@Controller('board')
export class BoardController {
    /**
     * description : [의뢰자] 회원가입 API
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
        description: '[의뢰자] 회원가입 DTO',
        type: PostSignUpRequesterRequest,
    })
    @Post('sign-up')
    postSignUp(@Body() postSignUpRequest: PostSignUpRequesterRequest) {
        return this.userService.createUser(postSignUpRequest);
    }
}
