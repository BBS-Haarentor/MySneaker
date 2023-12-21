import { UserEntity } from "../../user/models/user.entity";
export class IGame {
  id: number;
  name: string;
  status: string;
  description: string;
  cycle_index: number;
  teacher: UserEntity;
}