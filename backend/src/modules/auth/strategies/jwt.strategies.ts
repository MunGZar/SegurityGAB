import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { privateDecrypt } from 'crypto';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategies extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extrae token del header
      ignoreExpiration: false, //para rechasar tokents vencidos
      secretOrKey: configService.get('JWT_SECRET'), //clave secreta para verificar firma del token
    });
  }

  async validate (payload: any) {
    return {
      userId: payload.sub, 
      username: payload.username,
      role: payload.rol };
  }
}
