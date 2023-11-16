import { CompanyEntity } from "./company.entity";
import { UserEntity } from "../../user/models/user.entity";

export class ICompanyUser {
  id: number;
  company: CompanyEntity;
  user: UserEntity;
}