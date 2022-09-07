import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';
import { PostSignUpRequesterRequest } from '../user/dto/post-sign-up-user.request.dto';
import {
  makeResponse,
  saltHashPassword,
  validatePassword,
} from '../config/function.utils';
import { UserEntity } from '../entity/user.entity';
import { response } from '../config/response.utils';
import { PostBoardRequest } from './dto/post-board.request.dto';
import { BoardEntity } from '../entity/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Status } from '../common/variable.utils';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoardService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async editBoard(postBoardRequest: PostBoardRequest, id) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 입력한 패스워드에 해당하는 유저값 추출
      const user = await this.userRepository.findOne({
        where: { password: postBoardRequest.password },
      });

      // 제목 길이 validation
      if (postBoardRequest.title.length > 20) {
        return response.UNAUTHORIZED;
      }
      // 본문 길이 validation
      if (postBoardRequest.text.length > 200) {
        return response.UNAUTHORIZED;
      }
      // 비밀번호 validation
      const reg = /^(?=.*?[0-9]).{6,}$/;
      if (!reg.test(postBoardRequest.password)) {
        return response.UNAUTHORIZED;
      }
      const hashedPassword = await bcrypt.hash(postBoardRequest.password, 3);

      if (user.password != hashedPassword) {
        return response.UNAUTHORIZED;
      }

      // board 수정
      await queryRunner.manager.update(
        BoardEntity,
        { id: id },
        { title: postBoardRequest.title },
      );

      await queryRunner.manager.update(
        BoardEntity,
        { id: id },
        { text: postBoardRequest.text },
      );

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        message: '게시글이 수정 되었습니다.',
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

  async deleteBoard(postBoardRequest: PostBoardRequest, id) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 입력한 패스워드에 해당하는 유저값 추출
      const user = await this.userRepository.findOne({
        where: { password: postBoardRequest.password },
      });

      // 비밀번호 검증
      const reg = /^(?=.*?[0-9]).{6,}$/;
      if (!reg.test(postBoardRequest.password)) {
        return response.UNAUTHORIZED;
      }
      const hashedPassword = await bcrypt.hash(postBoardRequest.password, 3);

      if (user.password != hashedPassword) {
        return response.UNAUTHORIZED;
      }

      // board 삭제
      await queryRunner.manager.update(
        BoardEntity,
        { id: id },
        { status: Status.INACTIVE },
      );

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        message: '게시글이 삭제 되었습니다.',
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

  async createBoard(postBoardRequest: PostBoardRequest) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 입력한 패스워드에 해당하는 유저값 추출
      const user = await this.userRepository.findOne({
        where: { password: postBoardRequest.password },
      });

      // 제목 길이 검증
      if (postBoardRequest.title.length > 20) {
        return response.UNAUTHORIZED;
      }
      // 본문 길이 검증
      if (postBoardRequest.text.length > 200) {
        return response.UNAUTHORIZED;
      }
      // 비밀번호 검증
      const reg = /^(?=.*?[0-9]).{6,}$/;
      if (!reg.test(postBoardRequest.password)) {
        return response.UNAUTHORIZED;
      }
      const hashedPassword = await bcrypt.hash(postBoardRequest.password, 3);

      if (user.password != hashedPassword) {
        return response.UNAUTHORIZED;
      }
      // board 인스턴스 생성후, 정보 담는 부분
      const board = new BoardEntity();
      board.title = postBoardRequest.title;
      board.text = postBoardRequest.text;
      board.weather = await this.getWeather();
      await queryRunner.manager.save(board);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        message: '게시글이 생성 되었습니다.',
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

  async retrieveBoard(date) {
    // date 파라미터 있을 시 DESC 정렬
    const queryBuilder = this.dataSource.createQueryBuilder(
      BoardEntity,
      'board',
    );

    if (date) {
      await queryBuilder.where({
        createdAt: LessThan(date),
      });
    }

    const data = await queryBuilder
      .orderBy('board.createdAt', 'DESC')
      .take(20)
      .select(['board.createdAt', 'board.title', 'board.text', 'board.weather'])
      .getMany();

    const result = makeResponse(response.SUCCESS, data);

    return result;
  }

  async getWeather(): Promise<string> {
    const resData = await firstValueFrom(
      this.httpService.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q='37.5666805,126.9784147'&lang=ko`,
      ),
    );

    const { condition } = await resData.data.current;

    return condition.text;
  }
}
