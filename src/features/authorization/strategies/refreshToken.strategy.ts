import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { PayloadType } from '../types/payload.type';
import { AuthRepository } from '../repositories/authRepository';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request.cookies.refreshToken;
          if (!data) return null;
          return data;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: PayloadType): Promise<{ id: number }> {
    //kek O_O
    if (payload.userId !== 1) throw new UnauthorizedException();

    //check does exist user by id
    // const doesUserExist = await this.authRepository.doesExistUserById(
    //   payload.userId,
    // );
    // if (!doesUserExist) throw new UnauthorizedException();

    return {
      id: payload.userId,
    };
  }
}
