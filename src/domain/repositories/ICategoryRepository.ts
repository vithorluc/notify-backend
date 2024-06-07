import { ICategory } from "../entities/ICategory";

export interface ICategoryRepository {
  findOneById(id: number): Promise<ICategory | null>;
  save(category: ICategory): Promise<ICategory>;
}
