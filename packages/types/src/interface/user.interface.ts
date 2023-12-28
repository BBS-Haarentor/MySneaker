export interface IUser {
  id: number;
  username: string;
  role: Role[];
  status: string;
  password?: string;
}

enum Role {
  USER = 'user',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}