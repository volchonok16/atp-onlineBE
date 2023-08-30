import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './api/auth.controller';
import { AuthRepository } from './repositories/authRepository';
import { PasswordStrategy } from './strategies/password.strategy';
import { CheckCredentialsUseCase } from './useCases/checkCredentials.useCase';
import { JwtAdapter } from '../../common/adapters/jwt/jwtAdapter';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTokenUseCase } from './useCases/createToken.useCase';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ChangePasswordUseCase } from './useCases/changePassword.useCase';

const useCases = [
  CheckCredentialsUseCase,
  CreateTokenUseCase,
  ChangePasswordUseCase,
];
const repositories = [AuthRepository];
const strategies = [PasswordStrategy, RefreshTokenStrategy];
const adapters = [JwtAdapter];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '3600 seconds' }, // 1hour
    }),
  ],
  controllers: [AuthController],
  providers: [...useCases, ...repositories, ...adapters, ...strategies],
})
export class AuthModule {}
