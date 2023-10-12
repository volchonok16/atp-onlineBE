import { Inject, Injectable } from "@nestjs/common";
import { dbConnect_const } from "../../../common/constants/global.constants";
import { UserDto } from "../dto/user.dto";
import { UserType } from "../types/user.type";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";

@Injectable()
export class AuthRepository {
  constructor(private readonly firebird: FirebirdService) {}

  async findUserByUsernameAndPass(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.firebird.query<UserType>(
      `
SELECT PASS, USERS_KEY, USER_NAME
FROM USERS  
WHERE USER_NAME = ? 
AND PASS = ?`,
      [username, password]
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
      [userId]
    );
    return user[0] ? true : false;
  }

  async changePasswordByUserId(userId: number, newPassword: string) {
    await this.firebird.query(
      `
UPDATE USERS 
SET PASS = ?
WHERE USERS_KEY = ?`,
      [newPassword, userId]
    );
    return;
  }
}
