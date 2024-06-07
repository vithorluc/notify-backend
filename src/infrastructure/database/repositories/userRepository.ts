import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findOneById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
