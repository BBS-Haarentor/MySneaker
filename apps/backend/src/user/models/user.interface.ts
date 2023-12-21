import { Role } from '../../auth/roles/role.interface';

export interface IUser {
  id: number;
  username: string;
  role: Role[];
  status: string;
  password?: string;
}