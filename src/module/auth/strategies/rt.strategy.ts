import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true, // Để lấy token gốc so sánh hash
    });
  }

  validate(
    req: Request,
    payload: JwtPayload,
  ): JwtPayload & { refreshToken: string } {
    const refreshToken = (req.get('authorization') ?? '')
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
