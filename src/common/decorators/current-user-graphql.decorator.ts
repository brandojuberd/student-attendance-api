import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const userContext = ctx.getContext().req?.user;

    /**
     * HANDLE SOCKET/CONTROLLER AUTH
     */
    if (!userContext) return context.switchToHttp().getRequest()?.user;

    /**
     * HANDLE GRAPHQL/GENERAL AUTH
     */
    return userContext;
  }
);
