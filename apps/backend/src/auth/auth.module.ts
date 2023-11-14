import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        };
      },
    }),
    PassportModule,
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}