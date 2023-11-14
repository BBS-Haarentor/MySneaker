import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user/service/user.service';
import { IUser } from '../../user/models/user.interface';
import { Role } from "../roles/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    return this.userService.findOneRepository(user.id).then((dbUser) => {
      return roles.some((role) => dbUser.role?.includes(role as Role));
    });
  }
}
