import { Inject, Injectable } from '@nestjs/common';
import { dbConnect_const } from '../../../common/constants/global.constants';
import { Connection } from 'odbc';
import { UserDto } from '../dto/user.dto';
import { UserType } from '../types/user.type';

@Injectable()
export class AuthRepository {
  constructor(@Inject(dbConnect_const) private firebird: Connection) {}

  async findUserByUsernameAndPass(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.firebird.query<UserType>(
      `
SELECT PASS, USERS_KEY, USER_NAME
FROM USERS  
WHERE USER_NAME = ? 
AND PASS = ?`,
      [username, password],
    );
    if (!user[0]) return null;
    return new UserDto(user[0]);
  }

  async doesExistUserById(userId: number): Promise<boolean> {
    const user = await this.firebird.query<UserType>(
      `
SELECT *
FROM USERS  
WHERE USERS_KEY = ?`,
      [userId],
    );
    return user[0] ? true : false;
  }

  async changePasswordByUserId(userId: number, newPassword: string) {
    await this.firebird.query(
      `
UPDATE USERS 
SET PASS = ?
WHERE USERS_KEY = ?`,
      [newPassword, userId],
    );
    return;
  }
}
