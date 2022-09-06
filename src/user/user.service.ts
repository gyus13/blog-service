import { Injectable } from '@nestjs/common';
import { makeResponse, saltHashPassword } from 'src/config/function.utils';
import { PostSignUpRequesterRequest } from './dto/post-sign-up-user.request.dto';
import { UserEntity } from '../entity/user.entity';
import { response } from '../config/response.utils';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async createUser(postSignUpRequest: PostSignUpRequesterRequest) {
    const securityData = saltHashPassword(postSignUpRequest.password);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // GridgeRequester 인스턴스 생성후, 정보 담는 부분
      const user = new UserEntity();
      user.password = securityData.hashedPassword;
      await queryRunner.manager.save(user);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        message: '유저가 생성 되었습니다.',
      };

      const result = makeResponse(response.SUCCESS, data);

      // Commit
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      console.log(error);
      return response.ERROR;
    } finally {
      await queryRunner.release();
    }
  }
}
