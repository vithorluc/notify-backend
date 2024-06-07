import { IUser } from "../entities/IUser";

export interface IUserRepository {
  findOneById(id: number): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
}
