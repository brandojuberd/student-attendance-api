import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ValidatedUser } from './dto/validated-user.object';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService, // private readonly employeeService: EmployeesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  /**
   * Called when GqlAuthGuard is required
   * @payload decoded token
   */
  async validate(
    payload: JwtPayload,
    // : JwtPayload
  ): Promise<User | boolean> {
    const { sub } = payload;
    const user = await this.usersService.findById(new TypeObjectId(sub)).lean();
    if (!user) return false;

    return user;
  }
}
