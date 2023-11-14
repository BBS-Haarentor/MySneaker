import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user/service/user.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userService;
    constructor(reflector: Reflector, userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=roles.guard.d.ts.map