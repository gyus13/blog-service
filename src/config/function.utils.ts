import crypto = require('crypto');

// salt 값 생성
export function generateRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// 단방향 암호화 설정해서 salt값과 암호화된 비밀번호 리턴
export function sha512(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return {
    salt: salt,
    hashedPassword: hashedPassword,
  };
}

/**
 * description : response를 만들어 주는 함수, result에 들어갈 것이 없다면 undefined 입력해야함
 * @param response
 * @param data
 * @returns object
 */
export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}

// 단방향 암호화 함수로 전달
export function saltHashPassword(password: string) {
  const salt = generateRandomString(16);
  return sha512(password, salt);
}
