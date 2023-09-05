export interface UsersAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}