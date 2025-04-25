import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(authDto: AuthDto) {
    try {
      const { email, password } = authDto;

      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('email ou senha incorreta');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('email ou senha incorreta');
      }

      const payload = {
        iss: 'cubos-movie',
        sub: 'authorization',
        aud: 'serve-users',
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    } catch (error) {
      throw new UnauthorizedException('email ou senha incorreta');
    }
  }
}
