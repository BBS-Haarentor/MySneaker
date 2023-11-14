import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IUser } from '../../user/models/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: IUser): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePasswords(password: string, storedPasswordHash: string): Observable<any>;
}
//# sourceMappingURL=auth.service.d.ts.map