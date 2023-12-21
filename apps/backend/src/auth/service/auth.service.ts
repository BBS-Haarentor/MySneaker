import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from "bcrypt";
import { IUser } from '../../user/models/user.interface';

@Injectable()
export class AuthService {
  constructor(
      private readonly jwtService: JwtService,
      private configService: ConfigService,
  ) {}

  async generateJwt(user: IUser, expiresIn: string): Promise<string> {
    return await this.jwtService.signAsync(
            { id: user.id },
            {
              expiresIn: expiresIn,
            },
        );
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async comparePasswords(
      password: string,
      storedPasswordHash: string,
  ): Promise<any> {
    return await compare(password, storedPasswordHash);
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    if (payload.user) {
      return payload.id;
    }
  }
}