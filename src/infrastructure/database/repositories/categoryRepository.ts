import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { Category } from "../entities/Category";

export class CategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async findOneById(id: number): Promise<Category | null> {
    return this.repository.findOneBy({ id });
  }

  async save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }
}
