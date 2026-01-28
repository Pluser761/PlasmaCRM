import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { jwtConstants } from './constants';
import { User } from '@plasma-crm/shared-types/auth';
import { JwtKeys } from '@plasma-crm/shared-types/auth';

type Token = {
  token_type: 'refresh' | 'access';
}


type Payload = Omit<User, 'password'>;

type JwtPayload = Token & Payload;

type JwtPayloadDecoded = JwtPayload & {
  iat: number;
  exp: number;
  jti?: string;
};



@Injectable()
export class AuthService {
  @Inject()
  private usersService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  private refreshKeys = new Set<string>();

  async signIn(username: string, pass: string): Promise<JwtKeys> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password: _password, ...result } = user;

    return await this.createKeyPair(result);
  }

  async refresh(refresh_roken: string): Promise<JwtKeys> {
    const decoded = this.jwtService.decode<JwtPayloadDecoded>(refresh_roken);

    const {
      token_type: _tt,
      iat: __iat,
      exp: __exp,
      jti: refreshId,
      ...payload
    } = decoded;

    if (!this.refreshKeys.has(refreshId)) {
      throw new UnauthorizedException();
    }

    this.refreshKeys.delete(refreshId);

    return await this.createKeyPair(payload);
  }

  async verifyAccessAsync(token: string): Promise<JwtPayloadDecoded> {
    let decoded: JwtPayloadDecoded;
    try {
      decoded = await this.jwtService.verifyAsync<JwtPayloadDecoded>(token, {
        secret: jwtConstants.secret,
      });
    } catch {
      throw new UnauthorizedException();
    }

    if (decoded['token_type'] === 'refresh') {
      throw new UnauthorizedException();
    }
    return decoded;
  }

  private async createKeyPair(payload: Payload): Promise<JwtKeys> {
    const refresh_payload = {
      ...payload,
      token_type: 'refresh',
    };

    const access_payload = {
      ...payload,
      token_type: 'access',
    };

    const refreshId = randomUUID();
    this.refreshKeys.add(refreshId);

    return {
      access_token: await this.jwtService.signAsync(access_payload, {
        expiresIn: '30m',
      }),
      refresh_token: await this.jwtService.signAsync(refresh_payload, {
        expiresIn: '7d',
        jwtid: refreshId,
      }),
    };
  }
}
