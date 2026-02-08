import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, SignupRequest } from './auth-type.type';
import { LoginRequest } from './auth-type.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: SignupRequest) {
    const { email, password, displayName } = data;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      displayName,
    });

    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  async login(data: LoginRequest) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new UnauthorizedException('invalid credentials');

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('invalid credentials');

    return this.signToken({
      email: user.email,
      displayName: user.displayName,
      isActive: user.isActive,
    });
  }

  private signToken(data: JwtPayload) {
    const payload = data;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }
}
