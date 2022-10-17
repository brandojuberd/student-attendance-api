import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { ValidatedUser } from './dto/validated-user.object';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidatedUser> {
    const userDoc = await this.usersService.findOne(
      { email },
      {},
      { lean: true },
    );

    if (!userDoc)
      throw new NotFoundException(
        'Email tidak terdaftar. Mohon lakukan registrasi terlebih dahulu.',
      );
    const { password: hashedPassword, ...result } = userDoc;
    const compared = await this.comparePassword(password, hashedPassword);

    //? status check
    if (!compared)
      throw new NotFoundException('Kombinasi email & password tidak tepat.');

    return {
      accessToken: this.jwtService.sign({
        sub: String(userDoc._id),
      }),
      _id: userDoc._id,
      email: userDoc.email,
      role: userDoc.role,
      username: userDoc.username,
    };
  }

  async login(email: string, password: string): Promise<ValidatedUser> {
    if (!email) throw new NotAcceptableException('Email harus disertakan');
    return await this.validateUser(email, password);
  }

  async getProfileAndRefreshToken(userContext: any): Promise<ValidatedUser> {
    const { username, userId } = userContext;
    const payload = { username, sub: userId };
    return {
      ...userContext,
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // async changePassword(userId, updatePasswordBody: UpdatePasswordInput) {
  //   // test-covered
  //   const { password_old, password, password_confirmation } =
  //     updatePasswordBody;
  //   if (password !== password_confirmation)
  //     throw new UnprocessableEntityException('Password tidak sama');

  //   const user = await this.usersService.findById(userId);
  //   if (!user) throw new UnauthorizedException('User tidak ditemukan');

  //   const hashedPassword = user.password;
  //   const compared = await this.comparePassword(password_old, hashedPassword);
  //   if (!compared) throw new UnauthorizedException('Ubah password gagal');

  //   user.password = this.usersService.hashPassword(password);
  //   return user.save();
  // }

  // async register(body: CreateUserInput, userContext?: UserContext) {
  //   const emailFound = await this.usersService.findOne({
  //     email: body.email.toLowerCase(),
  //   });
  //   /**
  //    * ROLE CHECK
  //    * ONLY ADMIN AND SUPER ADMIN CAN ADD ROLES OTHER THAN CUSTOMER
  //    * @todo: delete after createuserinput.role is deleted
  //    */
  //   if (userContext?.role === UserRolesEnum.SuperAdmin) {
  //   } else if (userContext?.role === UserRolesEnum.Admin) {
  //   } else {
  //     // model will automatically assign role customer
  //     delete body.role;
  //   }

  //   /**
  //    * DTO CHECK
  //    */
  //   if (emailFound)
  //     throw new BadRequestException('User dengan email ini sudah terdaftar.');

  //   // faulty logic?
  //   // if (body?.role && body?.role !== 'Customer')
  //   //   throw new Error('Not eligible to create this role');
  //   if (body.password)
  //     body.password = this.usersService.hashPassword(body.password);
  //   const user = await this.usersService.create(body);
  //   this.sendCustomerRegistrationEmail(user);
  //   return user;
  // }
}
