import { DataSource } from "typeorm";
import { Category } from "../entities/Category";

export class CategorySeeder {
  async run(dataSource: DataSource) {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      { name: "Sports" },
      { name: "Finance" },
      { name: "Movies" },
    ];

    for (const category of categories) {
      const existingCategory = await categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        const categoryEntity = categoryRepository.create(category);
        await categoryRepository.save(categoryEntity);
      }
    }
  }
}
