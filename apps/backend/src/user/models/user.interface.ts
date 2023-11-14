import { Role } from '../../auth/roles/role.enum';

export interface IUser {
  id: number;
  username: string;
  role: Role[];
  status: string;
  password?: string;
}
