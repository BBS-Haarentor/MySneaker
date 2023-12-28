import { ICompany } from './company.interface';
import { IUser } from './user.interface';

export interface ICompanyUser {
  id: number;
  company: ICompany;
  user: IUser;
}