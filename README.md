# BlogService

<div align="center">
  <img src="https://img.shields.io/badge/node-16.17.0-339933?logo=node.js"> 
  <img src="https://img.shields.io/badge/NestJS-9.0.0-E0234E?logo=NestJS"> 
  <img src="https://img.shields.io/badge/TypeScript-4.4.5-3178C6?logo=typescript"> 
  <img src="https://img.shields.io/badge/Swagger-6.1.0-DC382D?logo=swagger"> 
  <img src="https://img.shields.io/badge/TypeORM-0.3.9-010101"> 
</div>

## 소개

## 1. 서비스 개요

- 블로그 포스팅을 작성/수정/삭제 할 수 있는 서비스 입니다.
- 그날의 날씨에 따라 게시글의 값이 달라집니다.
- 값을 한번에 다 가져오는것이 아닌 페이징으로 20개씩 조회 가능합니다.

## 2. 구현 사항

### 1. 기능 목록

#### 1. 블로그 포스팅 C,U,D
- 따로 인증기능을 구현하지 않아, 암호화한 비밀번호를 이용해 request로 입력된 비밀번호와 비교하여 인증구현
- bcrypt를 사용해서 hash 알고리즘을 이용하여 비밀번호 암호화

#### 2. 블로그 포스팅 리스트 페이징

- 무한스크롤을 위해서 createdAt(생성시간)으로 최신순 정렬 후 Cursor 페이지네이션을 구현했습니다.

<img width="785" alt="스크린샷 2022-09-01 오후 10 44 18" src="https://user-images.githubusercontent.com/65529348/188895256-5b8c9c5c-e1c0-4369-9c79-441fd7f3a026.png">

- timestamp 타입의 createdAt을 우리나라 현재 시간으로 맞추기위해 timezone을 설정했습니다.

- offset기반 방식과 고민 후 더 빠르고, 무한스크롤에 맞는 페이지네이션으로 생각하여 구현했습니다.

#### 3. weatherAPI 구현

- axios를 이용하여 외부 api인 weatherAPI에 요청하여 서울의 경도,위도를 구하여 날씨 정보를 받아왔습니다.

### 2. ERD

<img width="785" alt="스크린샷 2022-09-01 오후 10 44 18" src="https://user-images.githubusercontent.com/65529348/188894680-e6e7e5b7-7040-4def-b0b7-be69fcd3c3b2.png">
</br>

### 3. Swagger 
- swagger 문서로 api를 테스트 하고, 사용할 파라미터 그에따른 리스폰스를 확인할 수 있습니다.
- localhost:3000/docs

# 참조문서

## 📌 [개발 컨벤션 - 노션페이지](https://www.notion.so/devksanbal/9da9e2986a634b07a9615dd4298af006)
