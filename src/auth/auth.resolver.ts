import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user-graphql.decorator';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { ValidatedUser } from './dto/validated-user.object';
import { GqlAuthGuard } from './gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // USERS

  @Mutation(() => ValidatedUser)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return await this.authService.login(email, password);
  }

  @Query(() => ValidatedUser, { description: 'Get profile and refresh token' })
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() userContext: User) {
    return this.authService.getProfileAndRefreshToken(userContext);
  }

  @Mutation(() => ValidatedUser, {
    description: 'refresh token and save device data',
  })
  @UseGuards(GqlAuthGuard)
  async profileRefresh(@CurrentUser() userContext: User) {
    return this.authService.getProfileAndRefreshToken(userContext);
  }
}
