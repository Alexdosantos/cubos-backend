import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt/jwt';

@Module({
  imports: [JwtModule.registerAsync({ ...jwtConfig, global: true })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
